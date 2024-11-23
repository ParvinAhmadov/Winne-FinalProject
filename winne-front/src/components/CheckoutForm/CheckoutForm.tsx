import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

interface CheckoutFormProps {
  clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setStatus("Stripe has not loaded yet. Please wait.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!clientSecret) {
      setStatus("Error: Missing client secret.");
      return;
    }

    try {
      setLoading(true);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement!,
          },
        }
      );

      if (error) {
        setStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent?.status === "succeeded") {
        setStatus("Payment successful!");

        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Order created:", data);
          setStatus("Order created successfully!");
          window.location.reload();
        } else {
          const errorData = await response.json();
          setStatus(`Failed to create order: ${errorData.message}`);
        }
      } else {
        setStatus("Payment incomplete. Please try again.");
      }
    } catch (err) {
      setStatus(
        `An error occurred: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 6,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 1,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            paddingBottom: "10px",
            fontSize: "18px",
          }}
        >
          PAYMENT DETAILS
        </Typography>
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            padding: 2,
            mb: 3,
            backgroundColor: "#f9f9f9",
          }}
        >
          <CardElement />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!stripe || !clientSecret || loading}
          fullWidth
          sx={{
            height: "50px",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#000000",
            ":hover": { backgroundColor: "#A53E4C" },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "PAY NOW"
          )}
        </Button>
        {status && (
          <Typography
            variant="body1"
            textAlign="center"
            borderRadius="4"
            color={status.includes("success") ? "green" : "red"}
            sx={{ mt: 3 }}
          >
            {status}
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default CheckoutForm;
