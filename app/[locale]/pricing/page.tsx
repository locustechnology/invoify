"use client";

import { useState, useEffect } from "react";
import { Check, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  description: string | null;
  dodoProductId: string | null;
  active: boolean;
}

const PricingPage = () => {
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Fetch payment plans from API
  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await fetch("/api/payments/plans");
        const data = await response.json();
        setPlans(data.plans || []);
      } catch (error) {
        console.error("Error fetching plans:", error);
        alert("Failed to load pricing plans");
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const handleSelectPlan = async (planId: string, planPrice: number) => {
    if (planPrice === 0) {
      window.location.href = "/en";
      return;
    }

    // Redirect to contact or payment info since auth is removed
    alert("Please contact us for payment information");
  };

  const getPlanFeatures = (planName: string, credits: number) => {
    const featuresMap: { [key: string]: string[] } = {
      'Starter': [
        'Receipt generation templates',
        'PDF export functionality',
        'Email receipt sending',
        'Basic customization options',
        'Community support',
        'Commercial usage allowed',
      ],
      'Pro': [
        'Everything in Starter',
        'Advanced template designs',
        'Priority processing',
        'Custom branding options',
        'Priority email support',
        'API access (coming soon)',
      ],
      'Premium': [
        'Everything in Pro',
        'Unlimited template access',
        'White-label solution',
        'Custom integrations',
        'Dedicated support',
        'Advanced analytics',
      ],
    };

    return featuresMap[planName] || [
      `${credits} credits included`,
      'Receipt generation',
      'PDF export',
      'Email support',
    ];
  };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
            <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                            Choose Your{" "}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Perfect Plan
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Start creating professional receipts and invoices. Upgrade when you need more features.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">

                        {/* Free Tier */}
                        <div className="relative bg-white rounded-3xl border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                                <p className="text-gray-600 mb-6">Perfect to get started</p>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-gray-900">$0</span>
                                        <span className="text-gray-600">/forever</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Basic receipt generation included
                                    </p>
                                </div>

                                <Link href="/en">
                                    <Button
                                        variant="outline"
                                        className="w-full py-6 rounded-xl font-medium text-base border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                                    >
                                        Get Started Free
                                    </Button>
                                </Link>

                                <ul className="mt-8 space-y-3">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">Basic receipt templates</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">PDF export</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">Email receipt sending</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">Community support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Paid Plans from API */}
                        {plans.map((plan, index) => {
                            const isPopular = plan.name.includes('Pro');

                            return (
                                <div
                                    key={plan.id}
                                    className="relative bg-white rounded-3xl border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Best Value Badge for Pro plan only */}
                                    {isPopular && (
                                        <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden">
                                            <div className="absolute top-7 -right-10 w-56 bg-blue-600 text-white text-center py-1.5 text-xs font-bold transform rotate-45 shadow-md">
                                                MOST POPULAR
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {plan.name}
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            {plan.description || 'Enhanced features for professionals'}
                                        </p>

                                        <div className="mb-8">
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-5xl font-bold text-gray-900">
                                                    ${plan.price}
                                                </span>
                                                <span className="text-gray-600">/once</span>
                                            </div>

                                            <p className="text-sm text-gray-600 mt-3">
                                                {plan.credits.toLocaleString()} credits • ${(plan.price / plan.credits).toFixed(3)}/credit
                                            </p>
                                        </div>

                                        <Button
                                            onClick={() => handleSelectPlan(plan.id, plan.price)}
                                            disabled={checkoutLoading !== null || loading}
                                            variant={isPopular ? 'default' : 'outline'}
                                            className={`w-full py-6 rounded-xl font-medium text-base transition-all duration-300 ${
                                                isPopular
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                                            }`}
                                        >
                                            {checkoutLoading === plan.id ? 'Processing...' : 'Contact for Purchase'}
                                        </Button>

                                        <ul className="mt-8 space-y-3">
                                            {getPlanFeatures(plan.name, plan.credits).map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PricingPage;