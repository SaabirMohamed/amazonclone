const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;
  // transform for strip
  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      description: item.description,
      products_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  // give strip the checkout session
  // some other deleiver prices
  // "shr_1ItxjJIbG4SNG3mUefmpEBmB",
  //   "shr_1Itxk6IbG4SNG3mU3hab3HQL",
  //   "shr_1ItxlKIbG4SNG3mUsErb3Aou",
  const session = await stripe.checkout.sessions.create({
    payment_methiod_types: ["card"],
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
  });
  res.status(200).json({ id: session.id });
};
