// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const { items, email } = req.body;
  // transform for stripe
  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));
  // console.log(transformedItems);
  // console.log(transformedItems.product_data);
  // give stripe the checkout session
  const session = await stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      shipping_rates: ["shr_1ItxhXIbG4SNG3mUB33kQ2P7"],
      line_items: transformedItems,
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      mode: "payment",
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    })
    .catch((error) => console.log(error.message));
  res.status(200).json({ id: session.id });
};

//   console.log(process.env.STRIPE_SECRET_KEY);
// const { items, email } = req.body;
// // transform for stripe
// const transformedItems = items.map((item) => ({
//   price_data: {
//     currency: "usd",
//     unit_amount: item.price * 100,
//     description: item.description,
//     products_data: {
//       name: item.title,
//       images: [item.image],
//     },
//   },
// }));
// // give stripe the checkout session
// const session = await stripe.checkout.sessions.create({
//   payment_methiod_types: ["card"],
//   shipping_rates: ["shr_1ItxhXIbG4SNG3mUB33kQ2P7"],
//   line_items: transformedItems,
//   shipping_address_collection: {
//     allowed_countries: ["GB", "US", "CA"],
//   },
//   mode: "payment",
//   success_url: `${process.env.HOST}/success`,
//   cancel_url: `${process.env.HOST}/checkout`,
//   metadata: {
//     email,
//     images: JSON.stringify(items.map((item) => item.image)),
//   },
// });
// res.status(200).json({ id: session.id });
