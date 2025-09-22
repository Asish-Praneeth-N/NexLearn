"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (userEmail === adminEmail) {
        router.push("/analytics");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox:
                "bg-black text-white border border-neutral-800 rounded-2xl p-6 shadow-lg w-full",
              card:
                "bg-black text-white border border-neutral-700 rounded-2xl shadow-xl w-full",
              headerTitle:
                "text-white font-bold text-2xl sm:text-3xl font-serif text-center",
              headerSubtitle: "text-neutral-400 text-sm text-center",
              socialButtonsBlockButton:
                "bg-neutral-900 text-white border border-neutral-700 hover:bg-neutral-800 w-full",
              formFieldInput:
                "bg-neutral-900 text-white border border-neutral-700 rounded-lg focus:border-white w-full",
              formButtonPrimary:
                "bg-white text-black font-semibold hover:bg-neutral-200 transition-all duration-300 rounded-lg w-full",
              footerActionLink: "text-white hover:underline",
            },
            variables: {
              colorBackground: "black",
              colorPrimary: "white",
              colorText: "white",
              colorTextSecondary: "#a3a3a3",
              borderRadius: "12px",
            },
          }}
        />
      </div>
    </div>
  );
}
