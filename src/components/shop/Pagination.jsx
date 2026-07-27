"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-16 font-sans">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-[12px] border border-[#E8DCD3] text-[#2B2B2B] hover:border-[#7B1E1E] hover:text-[#7B1E1E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-[12px] font-medium transition-all duration-300 ${
            currentPage === page 
              ? "bg-[#7B1E1E] text-white border border-[#7B1E1E]" 
              : "bg-white border border-[#E8DCD3] text-[#666] hover:border-[#7B1E1E] hover:text-[#7B1E1E]"
          }`}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-[12px] border border-[#E8DCD3] text-[#2B2B2B] hover:border-[#7B1E1E] hover:text-[#7B1E1E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
