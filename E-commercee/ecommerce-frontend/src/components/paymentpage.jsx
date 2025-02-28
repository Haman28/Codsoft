import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QwlMlRt2oN54qRQy8ScdWsGv6yh0CDn6MSAs5sx2OKLOyvnFK9Te8x0o1CQz8gfFXYUosm6kLA1JkCbPA4HyN6o00JH9JALDF");

const PaymentForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !totalAmount) {
      setError("Stripe has not been initialized or total amount is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create payment intent
      const response = await axios.post("http://localhost:4000/api/payment/create-intent", { totalAmount });
      const clientSecret = response.data.clientSecret;

      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message || "An unexpected error occurred.");
      } else {
        alert(`Payment successful! Status: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement style={{ margin: "10px 0" }} />
      <button type="submit" disabled={loading || !totalAmount}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

function PaymentPage() {
  const location = useLocation();
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    if (location.state?.totalAmount !== undefined) {
      setTotalAmount(Math.round(location.state.totalAmount * 100));
    }
  }, [location.state]);

  return (
    <div>
      <h1>Payment Page</h1>
      {totalAmount !== null ? (
        <p>Total Amount: ${(totalAmount / 100).toFixed(2)}</p>
      ) : (
        <p style={{ color: "red" }}>Loading total...</p>
      )}

      <Elements stripe={stripePromise}>
        <PaymentForm totalAmount={totalAmount} />
      </Elements>
    </div>
  );
}

export default PaymentPage;