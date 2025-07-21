"use client";

import { ProductType } from "@/types/types";
import Image from "next/image";
import { toast } from "react-toastify";
import { useCartStore } from "@/utils/store";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FeaturedClientProps = {
  featuredProducts: ProductType[];
};

const Featured = ({ featuredProducts }: FeaturedClientProps) => {
  const { addToCart } = useCartStore();
  const [index, setIndex] = useState(0);

  const handleCart = (item: ProductType) => {
    addToCart({
      id: item.id,
      title: item.title,
      img: item.img,
      price: item.price,
      ...(item.options?.length && {
        optionTitle: item.options[0].title,
      }),
      quantity: 1,
    });

    toast.success("✅ Product added to cart!", {
      position: "bottom-left",
      autoClose: 2000,
    });
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center bg-fuchsia-50 dark:bg-neutral-900 transition-colors duration-300 px-4">
      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-4 z-10 bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* SLIDE CONTENT */}
      <div className="w-full max-w-5xl h-full overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md"
          >
            {/* IMAGE */}
            <div className="relative w-full h-1/2 lg:w-1/2 lg:h-full">
              <Image
                src={featuredProducts[index].img ?? "/placeholder.png"}
                alt={featuredProducts[index].title}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>

            {/* TEXT */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center justify-center text-center px-4 mt-6 lg:mt-0">
              <h1 className="text-2xl md:text-3xl font-bold uppercase text-red-600 dark:text-red-400">
                {featuredProducts[index].title}
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                {featuredProducts[index].desc}
              </p>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                ${featuredProducts[index].price}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCart(featuredProducts[index])}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-4 z-10 bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Featured;
