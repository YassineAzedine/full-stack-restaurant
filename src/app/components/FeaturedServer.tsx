

import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";
import Featured from "@/components/Featured";
import {featured} from "@/data";
// const getData = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
//       cache: "no-store",
//     });

//     console.log(res); // Log the response for debugging
    
//     // Check if the response is successful (status code 200-299)
//     if (!res.ok) {
//       // Optionally, get more details from the response (if it's a JSON error response)
//       const errorDetails = await res.json();
//       throw new Error(
//         `Failed to fetch data: ${errorDetails.message || 'Unknown error'} (Status: ${res.status})`
//       );
//     }

//     // Return the parsed JSON from the response
//     return res.json();
//   } catch (error) {
//     console.error("Error occurred during fetch:", error);
//     // Here you can handle the error (you can set an error state or notify the user)
//     return null; // Or return a fallback value (e.g., empty array or error message)
//   }
// };



const FeaturedServer = async () => {

  // const featuredProducts: ProductType[] | null = await getData();
  const featuredProducts: ProductType[] | null = featured

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-[90vh] text-red-500">
        Aucun produit en vedette disponible.
      </div>
    );
  }

  return <Featured featuredProducts={featuredProducts} />;

};

export default FeaturedServer;
