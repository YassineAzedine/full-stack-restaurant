"use client";

import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import { motion } from "framer-motion";

const Offer = () => {
  return (
    <section
      aria-label="Special offer section"
      className="relative bg-black h-screen md:h-[70vh] flex flex-col md:flex-row md:justify-between overflow-hidden"
    >
      {/* Background image with overlay on md+ */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 bg-black/70 bg-[url('/offerBg.png')] bg-cover bg-center"
      />

      {/* Text container */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex-1 flex flex-col justify-center items-center text-center gap-8 p-6 max-w-xl mx-auto md:mx-12"
      >
        <h1 className="text-white text-5xl font-extrabold xl:text-6xl leading-tight drop-shadow-lg">
          Delicious Burger & French Fry
        </h1>
        <p className="text-white text-base xl:text-xl max-w-lg drop-shadow-md">
          Progressively simplify effective e-toilers and process-centric methods of empowerment. Quickly pontificate parallel.
        </p>

        {/* Countdown timer - uncomment to activate */}
        {/* <CountDown /> */}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 hover:bg-red-600 focus-visible:outline-red-300 text-white rounded-md py-3 px-8 font-semibold shadow-lg transition-transform"
          aria-label="Order now button"
        >
          Order Now
        </motion.button>
      </motion.div>

      {/* Image container */}
      <div className="relative flex-1 w-full md:h-full max-w-xl mx-auto md:max-w-none md:mx-0">
        <Image
          src="/offerProduct.png"
          alt="Delicious burger and French fry"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
};

export default Offer;
