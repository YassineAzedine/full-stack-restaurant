"use client";

import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
 
    

    setLoadingCheckout(true);
    try {
      const res = await fetch(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: totalPrice,
          products,
          status: "Not Paid!",
          userEmail: session.user.email,
        }),
      });
      console.log("Checkout response:", res);
      if (!res.ok) throw new Error("Failed to create order");
      const data = await res.json();

      router.push(`/pay/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong during checkout. Please try again.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]">
        <p className="text-red-500 text-xl font-semibold">Loading your cart...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] text-red-500">
        <p className="text-2xl font-semibold mb-4">Your cart is empty</p>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
          onClick={() => router.push("/menu")}
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] flex flex-col lg:flex-row text-red-500 bg-white">
      {/* PRODUCTS LIST */}
      <section className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-9rem)] lg:max-h-full border-b lg:border-b-0 lg:border-r border-red-200">
        <h2 className="text-3xl font-bold mb-6">Your Cart ({totalItems} items)</h2>
        <ul className="space-y-6">
          {products.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-6 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              aria-label={`${item.title}, quantity ${item.quantity}, price ${item.price} dollars`}
            >
              {item.img && (
                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border border-red-300">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="uppercase text-xl font-semibold">{item.title}</h3>
                {item.optionTitle && (
                  <p className="text-sm text-gray-600">Option: {item.optionTitle}</p>
                )}
                <p className="text-red-600 font-bold mt-1">${item.price} × {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                aria-label={`Remove ${item.title} from cart`}
                className="text-red-500 hover:text-red-700 font-extrabold text-xl focus:outline-none"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* PAYMENT SUMMARY */}
      <aside className="flex flex-col gap-6 p-6 bg-fuchsia-50 lg:w-1/3 2xl:w-1/4 rounded-tr-lg rounded-br-lg">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between text-lg">
          <span>Subtotal ({totalItems} items):</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Service Cost:</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Delivery Cost:</span>
          <span className="text-green-600 font-semibold">FREE!</span>
        </div>
        <hr />
        <div className="flex justify-between text-xl font-extrabold">
          <span>Total (Incl. VAT):</span>
          <span>${totalPrice}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loadingCheckout}
          className={`mt-auto bg-red-500 text-white py-3 rounded-md w-full font-semibold transition 
            ${loadingCheckout ? "opacity-60 cursor-not-allowed" : "hover:bg-red-600"}`}
          aria-busy={loadingCheckout}
        >
          {loadingCheckout ? "Processing..." : "Proceed to Checkout"}
        </button>
      </aside>
    </div>
  );
};

export default CartPage;
