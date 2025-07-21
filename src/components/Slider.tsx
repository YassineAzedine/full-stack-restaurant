"use client";
import Image from "next/image";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50 dark:bg-neutral-900 transition-colors duration-300">
      
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-600 dark:text-red-400 font-extrabold p-6 text-center">
        <motion.h1
          key={currentSlide} // re-animate when slide changes
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl xl:text-7xl uppercase tracking-tight leading-tight drop-shadow-md"
        >
          {data[currentSlide].title}
        </motion.h1>

        <Link href="/menu">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-full shadow-md transition-all duration-300"
          >
            Order Now
          </motion.button>
        </Link>

        {/* Optional Dots */}
        <div className="flex gap-2 mt-4">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-red-600 scale-125" : "bg-red-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* IMAGE CONTAINER */}
      <div className="relative w-full flex-1 overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={data[currentSlide].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Image
              src={data[currentSlide].image}
              alt={data[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 pointer-events-none" />
      </div>
    </div>
  );
};

export default Slider;
