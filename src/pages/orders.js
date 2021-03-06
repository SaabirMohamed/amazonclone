import moment from "moment";
import Head from "next/head";
import { getSession, useSession } from "next-auth/client";
import React from "react";
import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";

const Orders = ({ orders }) => {
  const session = useSession();

  return (
    <div>
      <Head>
        <title>Orders page: Amazon clone by Saabir</title>
      </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b pb-1 border-yellow-400">
          Your orders
        </h1>
        {session ? (
          <h2>{orders ? orders.length : "log in to see "} Orders</h2>
        ) : (
          <h2>please sign in to see orders</h2>
        )}
        <div className="mt-5 space-y-4 ">
          {orders ? (
            orders.map(
              ({ id, amount, amountShipping, images, timestamp, items }) => (
                <Order
                  id={id}
                  key={id}
                  amount={amount}
                  amountShipping={amountShipping}
                  images={images}
                  timestamp={timestamp}
                  items={items}
                />
              )
            )
          ) : (
            <h1>Login to see your orders</h1>
          )}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  // need strip and users state
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  //get logged in user
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  // from firebase
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  console.log(orders);
  return {
    props: {
      orders: orders,
    },
  };
}

export default Orders;
