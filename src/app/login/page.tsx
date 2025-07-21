"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  // Redirect if authenticated (useEffect to avoid redirect during render)
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-red-500 text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center bg-gray-50">
      {/* Container */}
      <div className="shadow-2xl rounded-lg flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2 bg-white overflow-hidden">
        {/* IMAGE SIDE */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image
            src="/loginBg.png"
            alt="Login Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* FORM SIDE */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2 justify-center">
          <h1 className="font-extrabold text-2xl xl:text-4xl text-red-600">Welcome Back</h1>
          <p className="text-gray-600 text-base xl:text-lg">
            Log into your account or create a new one using social buttons below.
          </p>

          {/* Social Buttons */}
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-4 p-4 border border-red-300 rounded-md hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Sign in with Google"
          >
            <Image src="/google.png" alt="Google Logo" width={24} height={24} />
            <span className="text-red-600 font-semibold">Sign in with Google</span>
          </button>

          <button
            onClick={() => signIn("facebook")}
            className="flex items-center gap-4 p-4 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Sign in with Facebook"
          >
            <Image src="/facebook.png" alt="Facebook Logo" width={24} height={24} />
            <span className="text-blue-600 font-semibold">Sign in with Facebook</span>
          </button>

          {/* Support Link */}
          <p className="text-sm text-gray-500">
            Having trouble?{" "}
            <Link href="/" className="underline text-red-500 hover:text-red-700">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
