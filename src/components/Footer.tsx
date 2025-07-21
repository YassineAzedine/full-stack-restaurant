"use client";

import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 text-red-500 px-4 md:px-20 lg:px-40 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 border-t border-red-500">
      <Link href="/" aria-label="Go to homepage" className="font-extrabold text-2xl md:text-3xl hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition">
        FOODIE
      </Link>

      <p className="text-sm md:text-base select-none">
        © {currentYear} ALL RIGHTS RESERVED.
      </p>

      <nav aria-label="Social media links" className="flex gap-6 text-red-500">
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded transition">
          <FaFacebookF size={20} />
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded transition">
          <FaTwitter size={20} />
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded transition">
          <FaInstagram size={20} />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
