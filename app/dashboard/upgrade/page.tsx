import React from "react";
import { Check } from "lucide-react";

const UpgradePage = () => {
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
    <div className="min-h-screen bg-black rounded-xl p-10 flex flex-col items-center justify-center">
      <div className="text-center text-white mb-16">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Upgrade Your Plan
        </h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Unlock powerful features and take your productivity to the next level.
          Choose the plan that fits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white/95 rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center transform transition-all hover:scale-105 hover:shadow-purple-500/40 duration-300 ${
              plan.highlight ? "border-4 border-purple-500" : ""
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 px-4 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full shadow-md">
                Most Popular
              </span>
            )}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {plan.name}
            </h2>
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              {plan.price}
            </p>
            <p className="text-gray-600 mb-6">{plan.description}</p>

            <ul className="text-gray-700 text-left space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="text-green-500 w-5 h-5" /> {feature}
                </li>
              ))}
            </ul>

            <button
              className={`px-6 py-3 rounded-xl font-semibold text-white w-full shadow-md transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                  : "bg-gray-700 hover:bg-gray-900"
              }`}
            >
              {plan.highlight ? "Upgrade Now" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePage;
