import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";
import {menus} from "@/data";
// const getData = async ()=>{
//   try{
//    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`,{
//      cache:"no-store"
//    })
 
//    if(!res.ok){
//      throw new Error("Failed!");
     
//    }
 
//    return res.json()
//   }catch (error){
//    console.error("Error occurred during fetch:", error);
//    // Here you can handle the error (you can set an error state or notify the user)
//    return null; //
//   }
//  }

const MenuPage = async () => {

  // const menu:MenuType = await getData()
  const menu:MenuType = menus

  return (
  <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row gap-6">
  {menu && menu.map((category) => (
    <Link
      href={`/menu/${category.slug}`}
      key={category.id}
      className="relative flex-1 h-48 md:h-auto bg-cover bg-center rounded-lg shadow-lg overflow-hidden group"
      style={{ backgroundImage: `url(${category.img})` }}
      aria-label={`Explore category ${category.title}`}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition" />

      {/* Text container */}
      <div className="relative z-10 w-1/2 p-6 flex flex-col justify-center h-full text-white">
        <h1 className="uppercase font-extrabold text-2xl md:text-3xl tracking-wide drop-shadow-lg">{category.title}</h1>
        <p className="text-sm my-4 opacity-90 drop-shadow-md">{category.desc}</p>
        <button
          className={`hidden 2xl:inline-block py-2 px-4 rounded-md font-semibold transition
            ${category.color === "black" ? "bg-black text-white" : "bg-red-500 text-white hover:bg-red-600"}`}
          type="button"
        >
          Explore
        </button>
      </div>
    </Link>
  ))}
</div>

  );
};

export default MenuPage;
