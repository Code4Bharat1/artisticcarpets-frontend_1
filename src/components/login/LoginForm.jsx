"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { loginSchema, yupResolver } from "@/schemas/loginSchema";
import { loginUser, googleAuth } from "@/services/authService";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useStore();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    setServerError("");
    try {
      const response = await loginUser(formData);
      login(response.user || { name: formData.email.split("@")[0], email: formData.email }, response.token);
      router.push("/");
    } catch (err) {
      setServerError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setServerError("");
      try {
        // Send access token to backend
        const response = await googleAuth(tokenResponse.id_token || tokenResponse.access_token);
        if (response.success) {
          login(response.user, response.token);
          router.push("/");
        } else {
          setServerError(response.message || "Google login failed.");
        }
      } catch (err) {
        setServerError(err.response?.data?.message || "Google login failed.");
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login error", error);
      setServerError("Google authentication failed. Please try again or check your client ID.");
    },
  });

  return (
    <div className="relative w-full lg:w-1/2 min-h-full bg-white flex flex-col justify-center px-5 sm:px-10 lg:px-14 py-8 sm:py-12">
      <div className="max-w-[420px] w-full mx-auto space-y-6 sm:space-y-7">
        {/* Title Header */}
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1E1E1E] font-normal tracking-tight">
            Login to Your Account
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#666666] font-light">
            Welcome back. Please enter your details.
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-sans">
            {serverError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 w-full" noValidate>
          {/* Email Address Field */}
          <div className="space-y-1.5 w-full">
            <label
              htmlFor="email"
              className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]"
            >
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              type="email"
              placeholder="artisan@carpets.com"
              suppressHydrationWarning
              {...register("email")}
              className={`w-full px-4 py-3 sm:py-3.5 text-sm font-sans text-[#1E1E1E] bg-[#faf9f5]  border rounded-xl outline-none transition-all duration-200 placeholder:text-[#999999] ${
                errors.email
                  ? "border-red-500 focus:border-red-600"
                  : "border-[#E8E3DD] focus:border-[#980E0A] focus:bg-white focus:shadow-xs"
              }`}
            />
            {errors.email && (
              <p className="text-xs font-sans text-red-600 font-medium pt-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field & Forgot Password */}
          <div className="space-y-1.5 w-full">
            <div className="flex items-center justify-between w-full">
              <label
                htmlFor="password"
                className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#1E1E1E]"
              >
                PASSWORD
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="font-sans text-xs font-semibold text-[#980E0A] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              suppressHydrationWarning
              {...register("password")}
              className={`w-full px-4 py-3 sm:py-3.5 text-sm font-sans text-[#1E1E1E] bg-[#faf9f5]  border rounded-xl outline-none transition-all duration-200 placeholder:text-[#999999] ${
                errors.password
                  ? "border-red-500 focus:border-red-600"
                  : "border-[#E8E3DD] focus:border-[#980E0A] focus:bg-white focus:shadow-xs"
              }`}
            />
            {errors.password && (
              <p className="text-xs font-sans text-red-600 font-medium pt-0.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            
            className="w-full py-3.5 bg-[#700B08] hover:bg-[#980E0A] text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 mt-2"
          >

            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        {/* OR LOGIN WITH Divider */}
        <div className="relative flex items-center justify-center pt-1 w-full">
          <div className="border-t border-[#E8E3DD] w-full" />
          <span className="bg-white px-4 font-sans text-[10px] font-bold tracking-widest text-[#999999] uppercase shrink-0">
            OR LOGIN WITH
          </span>
          <div className="border-t border-[#E8E3DD] w-full" />
        </div>

        {/* Social Button: Google */}
        <div className="w-full">
          <button
            type="button"
            onClick={() => loginWithGoogle()}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#faf9f5] border border-[#E8E3DD] rounded-xl hover:border-[#980E0A] hover:bg-white font-sans text-xs font-semibold text-[#1E1E1E] transition-all duration-200 shadow-2xs cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z"
              />
            </svg>
            <span>Google</span>
          </button>
        </div>

        {/* Bottom Sign Up Link */}
        <div className="text-center font-sans text-xs text-[#666666] pt-1">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-[#980E0A] hover:underline">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Decorative Bottom Right Motif */}
      <div className="absolute bottom-4 right-4 hidden sm:grid grid-cols-2 gap-1.5 w-8 h-8 opacity-30 pointer-events-none">
        <div className="border-2 border-[#C4A892] rounded-xs" />
        <div className="border-2 border-[#C4A892] rounded-xs" />
        <div className="border-2 border-[#C4A892] rounded-xs" />
        <div className="border-2 border-[#C4A892] rounded-xs" />
      </div>
      
      <ForgotPasswordModal 
        isOpen={isForgotModalOpen} 
        onClose={() => setIsForgotModalOpen(false)} 
      />
    </div>
  );
}
