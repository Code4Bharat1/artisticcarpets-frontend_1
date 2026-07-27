"use client";

import SortDropdown from "./SortDropdown";

export default function ShopHeader({ totalItems, startItem, endItem, currentSort, onSortChange }) {
 
  return (
    <div className="mb-8">
      
      <h1 className="font-serif text-2xl md:text-3xl font-normal text-[#2B2B2B] mb-8">
        All Rugs & Carpets
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E8DCD3] pt-6 gap-4">
        <p className="font-sans text-sm text-[#666]">
          Showing {startItem}–{endItem} of {totalItems} artisan rugs
        </p>
        
        <SortDropdown currentSort={currentSort} onSortChange={onSortChange} />
      </div>
    </div>
  );
}
