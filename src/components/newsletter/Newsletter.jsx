"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

export default function Newsletter({ data }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const title = data?.title || "Subscribe to Our Newsletter";
  const subtitle = data?.content || "Get the latest news and access to exclusive promotions";
  const bgImage = data?.data?.image || "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=1200&auto=format&fit=crop";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
    reset();
  };

  return (
    <section className="bg-neutral-950 w-[79vw] rounded-xl shadow-sm my-4 mx-auto py-28 text-brand-white relative overflow-hidden">
      {/* Background Image of Draped Oriental Carpets */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <img
          src={bgImage}
          alt="Newsletter background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark Vignette Overlay for Text Readability */}
      <div className="absolute w-full inset-0 bg-linear-to-r from-black/20 via-black/5 to-black/20 bg-top-right z-0 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Header Text matching the mockup exactly */}
          <div className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#FEF8E6]">
              {title}
            </h2>
            <p className="font-sans text-xs md:text-sm tracking-widest text-brand-white/70 font-light max-w-lg mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-brand-white/10 backdrop-blur-md border border-brand-white/20 p-6 rounded-xl max-w-md mx-auto animate-fade-in">
              <p className="font-sans text-sm font-semibold tracking-wide">
                Thank you for subscribing. Welcome to the Artistic Circle.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto">
              {/* Joined Input Group matching the mockup exactly */}
              <div className="flex flex-col sm:flex-row items-stretch justify-center w-full relative">
                <div className="flex-1 relative w-full">
                  <input
                    type="email"
                    placeholder="Enter Your Email Address"
                    suppressHydrationWarning
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full bg-black/40 text-brand-white placeholder-brand-white/40 text-xs md:text-sm font-light px-6 py-4 outline-none border transition-all duration-300 focus:bg-black/60 focus:border-brand-white/30 h-full ${
                      errors.email ? "border-red-500/60" : "border-brand-white/10"
                    } sm:rounded-l sm:rounded-r-none rounded-t sm:border-r-0`}
                  />
                  {errors.email && (
                    <span className="absolute left-6 -bottom-5 text-[10px] text-red-400 font-light">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                
                {/* Custom Sand Gold Subscribe Button */}
                <button
                  type="submit"
                  className="bg-[#C5A880] hover:bg-[#b2966e] text-brand-white font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 sm:py-0 sm:h-auto transition-all duration-300 cursor-pointer sm:rounded-r sm:rounded-l-none rounded-b focus:outline-none flex-shrink-0"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
