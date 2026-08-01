"use client";

import React, { useState } from "react";
import { forgotPassword, resetPassword } from "@/services/authService";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  if (!isOpen) return null;

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setMessage({ type: "success", text: response.message });
        setStep(2); // Move to reset password step
      } else {
        setMessage({ type: "error", text: response.message || "Something went wrong." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to send reset link." });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await resetPassword(email, resetToken, newPassword);
      if (response.success) {
        setMessage({ type: "success", text: "Password reset successfully. You can now login." });
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setMessage({ type: "error", text: response.message || "Failed to reset password." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to reset password." });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmail("");
    setResetToken("");
    setNewPassword("");
    setMessage({ type: "", text: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="font-serif text-2xl text-[#1E1E1E] mb-2">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>
        <p className="font-sans text-sm text-[#666666] mb-6">
          {step === 1
            ? "Enter your email address and we'll send you a link to reset your password."
            : "Enter the reset token sent to your email and your new password."}
        </p>

        {message.text && (
          <div
            className={`p-3 rounded-xl border text-xs font-sans mb-4 ${
              message.type === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="reset-email" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm font-sans text-[#1E1E1E] bg-[#faf9f5] border border-[#E8E3DD] rounded-xl outline-none focus:border-[#980E0A] focus:bg-white focus:shadow-xs transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#700B08] hover:bg-[#980E0A] text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="reset-token" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]">
                Reset Token
              </label>
              <input
                id="reset-token"
                type="text"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm font-sans text-[#1E1E1E] bg-[#faf9f5] border border-[#E8E3DD] rounded-xl outline-none focus:border-[#980E0A] focus:bg-white focus:shadow-xs transition-all duration-200"
                placeholder="Enter token"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="new-password" className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 text-sm font-sans text-[#1E1E1E] bg-[#faf9f5] border border-[#E8E3DD] rounded-xl outline-none focus:border-[#980E0A] focus:bg-white focus:shadow-xs transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#700B08] hover:bg-[#980E0A] text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
