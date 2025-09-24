"use client";
import React, { useState } from "react";
import { Check, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const UpgradePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect to explore our platform",
      features: ["Basic Code Analysis", "Community Support", "Limited Reports"],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19/mo",
      description: "For developers who want more power",
      features: [
        "Advanced Code Analysis",
        "Priority Email Support",
        "Unlimited Reports",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large teams",
      features: [
        "Dedicated Account Manager",
        "Custom Integrations",
        "24/7 Premium Support",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black rounded-xl p-6 md:p-10 flex flex-col items-center justify-center relative">
      {/* Back Button - Mobile Only */}
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-4 left-4 p-2 rounded-full bg-white text-black shadow-md md:hidden"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="text-center text-white mb-16 mt-10 md:mt-0">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Upgrade Your Plan
        </h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Unlock powerful features and take your productivity to the next level.
          Choose the plan that fits your needs.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-black text-white border rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transform transition-all hover:scale-105 hover:shadow-xl duration-300 ${
              plan.highlight ? "border-2 border-white" : "border border-gray-600"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 px-4 py-1 bg-white text-black text-sm font-semibold rounded-full shadow-md border border-gray-400">
                Most Popular
              </span>
            )}
            <h2 className="text-3xl font-bold mb-4">{plan.name}</h2>
            <p className="text-4xl font-extrabold mb-4">{plan.price}</p>
            <p className="text-gray-300 mb-6">{plan.description}</p>

            <ul className="text-gray-200 text-left space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="text-white w-5 h-5" /> {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsDialogOpen(true)}
              className={`px-6 py-3 rounded-xl font-semibold text-black w-full shadow-md transition-all duration-300 ${
                plan.highlight
                  ? "bg-white hover:bg-gray-200"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {plan.highlight ? "Upgrade Now" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl shadow-2xl p-8 w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">🚧 Coming Soon</h2>
            <p className="mb-6 text-gray-700">
              This feature is not yet available. Stay tuned for updates!
            </p>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpgradePage;
