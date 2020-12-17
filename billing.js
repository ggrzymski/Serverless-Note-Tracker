import stripePackage from "stripe";
import handler from "./libs/handler-lib";
import {calculateCost} from "./libs/billing-lib";

export const main = handler(async (event, context) => {
  /*
    storage = # of notes that the user would like to store.
    source = Stripe token for the card that we are going to charge.
   */
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  const stripe = stripePackage(process.env.stripeSecretKey);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd"
  });

  return { status: true};
});

