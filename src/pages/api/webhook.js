import { buffer } from "micro";
import * as admin from "firebase-admin";
// connecting this backing script to firebase [after enabling service accounts in the app on firebase]
const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();
// establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const fullfillOrder = async (session) => {
  // console.log("FULL session order", session);
  // use the firbase app instance on server side to communicate to firestoreDB and add the order
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(
        `SUCCESS: Order ${session.id} has been added to the database`
      );
    });
};
export default async (req, res) => {
  console.log(req.method);
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    // check event from dstipe
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      res.status(400).send(`Webhook error ${error.message}`);
    }

    // handel the completed event from stripe
    console.log(event.type);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(session);
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook error ${err.message}`));
      // fullfill the order
      // put inside your database [MySql , firebase, mongo]
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
