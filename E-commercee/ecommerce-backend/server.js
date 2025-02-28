require("dotenv").config();

const express = require("express");
const Stripe = require("stripe"); // Fix: Properly import Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json()); // ✅ Ensure JSON body is parsed before handling requests

// Payment Route
app.post("/api/payment/create-intent", async (req, res) => {
  try {

    const { totalAmount } = req.body;

    if (!totalAmount) {
      return res.status(400).json({ error: "Total amount is required" }); // ✅ Handle missing data
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Stripe requires amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message }); // ✅ Send back Stripe error message
  }
});
const paymentRoutes = require("./routes/paymentroutes");
app.use("/api/payment/create-intent", paymentRoutes);
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
