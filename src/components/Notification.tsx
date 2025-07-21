"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NotificationProps = {
  message?: string;
  duration?: number; // in ms, auto-dismiss time
};

const Notification = ({
  message = "Free delivery for all orders over $50. Order your food now!",
  duration = 5000,
}: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  // Auto-dismiss after duration
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="alert"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 h-12 bg-red-500 text-white px-4 flex items-center justify-between text-center text-sm md:text-base cursor-pointer shadow-md"
        >
          <p className="flex-1">{message}</p>
          <button
            aria-label="Close notification"
            onClick={() => setVisible(false)}
            className="ml-4 px-2 py-1 rounded hover:bg-red-600 transition"
          >
            &#10005;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
