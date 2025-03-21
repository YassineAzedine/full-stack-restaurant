"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const SuccessPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent"); // Utilisation de useSearchParams pour obtenir les paramètres de l'URL

  useEffect(() => {
    const makeRequest = async () => {
      if (payment_intent) {
        try {
          await fetch(`${process.env.NEXTAUTH_URL}/api/confirm/${payment_intent}`, {
            method: "PUT",
          });
          setTimeout(() => {
            router.push("/orders");
          }, 5000);
        } catch (err) {
          console.log(err);
        }
      }
    };

    if (payment_intent) {
      makeRequest();
    }
  }, [payment_intent, router]);

  return (
    <div>
      {loading ? <p>Processing payment...</p> : <p>Payment successful!</p>}
    </div>
  );
};

export default SuccessPage;
