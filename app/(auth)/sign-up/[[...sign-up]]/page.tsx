"use client";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <SignUp
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
