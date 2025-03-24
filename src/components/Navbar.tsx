import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
    {/* LEFT: LOGO AND MENU */}
    <div className="flex items-center gap-4 flex-1">
      {/* Logo */}
      <Link href="/">
        <img src="logo_2.png" alt="Logo" className="h-10 w-auto md:h-20" />
      </Link>
      
      {/* Menu Links */}
      <div className="hidden md:flex gap-4 ml-4">
        <Link href="/menu" className="text-lg font-semibold hover:text-red-500 transition duration-300">Menu</Link>
        <Link href="/contact" className="text-lg font-semibold hover:text-red-500 transition duration-300">Contact</Link>
      </div>
    </div>
  
    {/* RIGHT LINKS */}
    <div className="hidden md:flex gap-4 items-center justify-end flex-1">
      <div className="md:absolute top-3 right-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
        <Image src="/phone.png" alt="Phone" width={20} height={20} />
        <span>123 456 78</span>
      </div>
      <UserLinks />
      <CartIcon />
    </div>
  
    {/* MOBILE MENU */}
    <div className="md:hidden">
      <Menu />
    </div>
  </div>
  
  );
};

export default Navbar;
