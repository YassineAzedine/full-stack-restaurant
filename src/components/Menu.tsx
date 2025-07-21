"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const user = false; // Replace with real auth logic

  const toggleMenu = () => setOpen(!open);

  const handleKeyToggle = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  };

  return (
    <nav>
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt={open ? "Close menu" : "Open menu"}
        width={24}
        height={24}
        role="button"
        tabIndex={0}
        onClick={toggleMenu}
        onKeyDown={handleKeyToggle}
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
        aria-expanded={open}
        aria-controls="mobile-menu"
      />

      {open && (
        <div
          id="mobile-menu"
          className="bg-red-500 text-white fixed left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-50"
        >
          <ul className="flex flex-col gap-8 items-center">
            {links.map((item) => (
              <li key={item.id}>
                <Link href={item.url} onClick={() => setOpen(false)}>
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={user ? "/orders" : "/login"} onClick={() => setOpen(false)}>
                {user ? "Orders" : "Login"}
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={() => setOpen(false)}>
                <CartIcon />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Menu;
