"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PayPageProps {
  params: { id: string };
}

const PayPage: React.FC<PayPageProps> = ({ params }) => {
  const { id } = params;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/create-intent/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch client secret");
        }

        const data = await res.json();
        if (!data.clientSecret) {
          throw new Error("Client secret not returned from API");
        }

        setClientSecret(data.clientSecret);
      } catch (err: any) {
        console.error("Error fetching client secret:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret ?? "",
    appearance: {
      theme: "stripe",
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">Loading payment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-600">
        <p className="mb-4">Error loading payment information:</p>
        <pre className="whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  return (
    <div className="max-w-xll mx-auto p-4">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p className="text-center text-gray-600">No payment information available.</p>
      )}
    </div>
  );
};

export default PayPage;
