"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, LogIn, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, login } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    login({
      name: isSignUp ? formData.name || "Alexander Sterling" : "Alexander Sterling",
      email: formData.email,
    });
  };

  const handleDemoLogin = () => {
    login({
      name: "Alexander Sterling",
      email: "alexander@artisticcarpets.com",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-text-primary/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#E8E3DD] p-8 md:p-10">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-text-secondary hover:text-[#980E0A] transition-colors p-1 rounded-full hover:bg-neutral-100"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-8">
          <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#980E0A] uppercase">
            ARTISTIC CARPETS CONCIERGE
          </span>
          <h2 className="font-serif text-3xl font-normal text-text-primary">
            {isSignUp ? "Create Atelier Account" : "Sign In to Your Account"}
          </h2>
          <p className="font-sans text-xs text-text-secondary font-light">
            {isSignUp
              ? "Join our circle for exclusive access to heritage collections."
              : "Access your private wishlist, orders, and curated commissions."}
          </p>
        </div>

        {/* Form Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 text-center font-sans">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-primary">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="E.g., Alexander Sterling"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm font-sans text-text-primary bg-[#FAF7F5] border border-[#E8E3DD] rounded-xl outline-none focus:border-[#980E0A] transition-all"
                  suppressHydrationWarning
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-primary">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="alexander@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 text-sm font-sans text-text-primary bg-[#FAF7F5] border border-[#E8E3DD] rounded-xl outline-none focus:border-[#980E0A] transition-all"
                required
                suppressHydrationWarning
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-primary">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 text-sm font-sans text-text-primary bg-[#FAF7F5] border border-[#E8E3DD] rounded-xl outline-none focus:border-[#980E0A] transition-all"
                required
                suppressHydrationWarning
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3.5 text-xs tracking-widest font-bold mt-2"
          >
            {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
          </Button>
        </form>

        {/* Demo Quick Login Button */}
        <div className="mt-4 pt-4 border-t border-[#E8E3DD]/60">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl border border-[#C4A892] text-[#980E0A] font-sans text-xs font-semibold tracking-wider uppercase hover:bg-[#FDF2F2] transition-colors flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>DEMO ONE-CLICK LOGIN</span>
          </button>
        </div>

        {/* Toggle between Sign In / Sign Up */}
        <div className="mt-6 text-center text-xs text-text-secondary font-light">
          {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="font-semibold text-[#980E0A] hover:underline ml-1"
          >
            {isSignUp ? "Sign In" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
