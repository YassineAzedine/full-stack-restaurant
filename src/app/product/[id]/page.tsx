import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";

const getData = async (id: string) => {
  try{
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed!");
    }

    

     
     return res.json();
  }catch(err){
    console.log(err)    

  }
  
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct: ProductType = await getData(params.id);
  
  

  return (
   <div className="p-6 lg:px-20 xl:px-40 min-h-screen flex flex-col md:flex-row md:gap-12 md:items-center text-red-500 bg-white">
  {/* IMAGE CONTAINER */}
  {singleProduct.img && (
    <div className="relative w-full md:w-1/2 h-64 sm:h-96 md:h-[70vh] rounded-lg shadow-lg overflow-hidden bg-gradient-to-tr from-gray-50 to-gray-100">
      <Image
        src={singleProduct.img}
        alt={singleProduct.title}
        fill
        className="object-contain transition-transform duration-500 hover:scale-105"
        priority
      />
    </div>
  )}

  {/* TEXT CONTAINER */}
  <div className="flex flex-col flex-1 mt-8 md:mt-0 gap-6 md:justify-center relative">
    <h1 className="text-4xl font-extrabold uppercase tracking-wide flex items-center justify-between gap-4">
      <span>{singleProduct.title}</span>
      <DeleteButton id={singleProduct.id} />
    </h1>
    <p className="text-base md:text-lg leading-relaxed max-w-xl opacity-90">{singleProduct.desc}</p>
    <div className="inline-block bg-red-50 rounded-lg p-4 w-max shadow-md">
      <Price product={singleProduct} />
    </div>
  </div>
</div>

  );
};

export default SingleProductPage;
