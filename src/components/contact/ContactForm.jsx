"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Clock, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/common/Button";
import { contactSchema, yupResolver } from "@/schemas/contactSchema";
import { submitContactInquiry } from "@/services/contactService";
import { useMutation } from "@/components/providers/QueryProvider";

export default function ContactForm() {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitContactInquiry,
    onSuccess: (data) => {
      setSuccessMessage(
        data?.message ||
          "Thank you for reaching out. Our concierge will contact you within 24 hours."
      );
      reset();
    },
  });

  const onSubmit = (formData) => {
    setSuccessMessage("");
    mutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#E8E3DD]/40 w-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <h2 className="font-serif text-3xl md:text-4xl text-[#980E0A] font-normal tracking-tight mb-3">
          Contact Us
        </h2>
        <p className="font-sans text-xs md:text-sm text-text-secondary font-light leading-relaxed mb-8">
          We invite you to reach out for a private consultation or any inquiries regarding our heritage collections.
        </p>

        {/* Feedback Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#F0FDF4] border border-green-200 flex items-start space-x-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-green-800 font-medium leading-relaxed">
              {successMessage}
            </p>
          </div>
        )}

        {mutation.isError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-red-800 font-medium">
              {mutation.error?.message || "Failed to submit inquiry. Please try again."}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 " noValidate>
          <Input
            label="Full Name"
            name="fullName"
            placeholder="E.g., Alexander Sterling"
            register={register}
            error={errors.fullName}
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            register={register}
            error={errors.phone}
            required
          />

          <TextArea
            label="Your Message"
            name="message"
            rows={4}
            placeholder="How can we assist you with your space?"
            register={register}
            error={errors.message}
            required
          />

          <Button
            type="submit"
            variant="primary"
            disabled={mutation.isPending}
            className="w-full py-4 text-xs !bg-[#980E0A] hover:!bg-[#7a0b08] transition-colors duration-300 tracking-widest font-bold mt-2 text-white"
          >
            {mutation.isPending ? "SUBMITTING INQUIRY..." : "SUBMIT INQUIRY"}
          </Button>
        </form>
      </div>

      {/* Bottom Information Row */}
      <div className="mt-8 pt-6 border-t border-[#E8E3DD]/60 flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-[#980E0A]/80 stroke-[1.5]" />
          <span className="font-sans font-medium">24h Response</span>
        </div>

        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#980E0A]/80 stroke-[1.5]" />
          <span className="font-sans font-medium">Verified Artisan</span>
        </div>
      </div>
    </div>
  );
}
