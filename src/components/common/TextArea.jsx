"use client";

import React from "react";

export default function TextArea({
  label,
  id,
  name,
  placeholder = "",
  rows = 4,
  register = () => ({}),
  error = null,
  required = false,
  className = "",
  ...props
}) {
  const textareaId = id || name;

  return (
    <div className={`w-full text-left space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block font-sans text-xs font-semibold uppercase tracking-wider text-text-primary/90"
        >
          {label}
          {required && <span className="text-[#980E0A] ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          id={textareaId}
          rows={rows}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...register(name)}
          {...props}
          className={`w-full px-4 py-3 text-sm font-sans text-text-primary bg-[#FAF7F5] border rounded-xl outline-none transition-all duration-300 resize-y placeholder:text-text-secondary/50 placeholder:font-light ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500/20"
              : "border-[#E8E3DD] focus:border-[#980E0A] focus:bg-white focus:shadow-sm"
          }`}
        />
      </div>

      {error && (
        <p id={`${textareaId}-error`} className="text-xs font-sans text-red-600 font-medium pt-0.5">
          {error.message || error}
        </p>
      )}
    </div>
  );
}
