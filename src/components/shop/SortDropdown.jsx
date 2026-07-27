"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price Low to High", value: "price_asc" },
  { label: "Price High to Low", value: "price_desc" },
  { label: "Best Rated", value: "rating" }
];

export default function SortDropdown({ currentSort, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = sortOptions.find(o => o.value === currentSort)?.label || "Featured";

  return (
    <div className="relative font-sans text-sm text-[#2B2B2B] z-20" ref={dropdownRef}>
      <button 
        className="flex items-center gap-2 py-2 px-4 border border-[#E8DCD3] rounded-[12px] bg-white hover:border-[#7B1E1E] transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[#666]">Sort by:</span>
        <span className="font-semibold">{selectedLabel}</span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E8DCD3] rounded-[12px] shadow-lg overflow-hidden"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left px-4 py-3 hover:bg-[#FAF7F4] transition-colors duration-200 ${
                  currentSort === option.value ? "text-primary-brand font-semibold bg-[#FAF7F4]" : "text-[#2B2B2B]"
                }`}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
