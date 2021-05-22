import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.stripe_public_key);
const Checkout = () => {
  const [session, loading] = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const createChekoutSession = async () => {
    const stripe = await stripePromise;
    // call the backend to create a session (nextjs built in api backend)
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });
    // redirect user/customer to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
      // show a modal...
    }
  };
  // console.log(items);
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div>
          <div className="flex-grow m-5 shadow-sm">
            <Image
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
            />
            <div className="flex p5 flex-col space-y-10 bg-white">
              <h1 className="text-3xl border-b pb-4">
                {items.length == 0
                  ? `your basket is empty `
                  : `Your Shopping Basket `}
              </h1>
              {items.map((item, i) => (
                <CheckoutProduct
                  key={i}
                  id={i}
                  title={item.title}
                  rating={item.rating}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  hasPrime={item.hasPrime}
                />
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <div
          className={`flex flex-col bg-white p-10 shadow-md ${
            items.length === 0 && "hidden"
          }`}
        >
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap m-5">
                subtotal ({items.length} items) :
                <span className="m-5 pl-3 font-bold">
                  <Currency quantity={total} currency="ZAR" />
                </span>
              </h2>
              <button
                role="link"
                onClick={createChekoutSession}
                disabled={!session}
                className={`button m-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                } `}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
