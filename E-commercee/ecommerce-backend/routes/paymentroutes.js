const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-intent", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging

    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: "Amount and currency are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error); // Log full error
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
