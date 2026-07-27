"use client";
import { X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const AccordionSection = ({ 
  title, 
  isOpen, 
  onToggle, 
  children, 
  isActive 
}) => {
  return (
    <div className="border-b border-[#E8DCD3] ">
      <button
        type="button"
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={isOpen}
        aria-controls={`accordion-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`w-full flex items-center justify-between py-[18px] cursor-pointer transition-colors duration-300 ${
          isActive ? 'text-[#7B1E1E]' : 'text-[#1E1E1E]'
        }`}
      >
        <span className="font-sans text-[18px] font-semibold">{title}</span>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'} ${
            isActive ? 'text-[#7B1E1E]' : 'text-[#1E1E1E]'
          }`} 
        />
      </button>
      <div 
        id={`accordion-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 pb-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ShopSidebar({ 
  filters, 
  setFilters, 
  isOpen, 
  setIsOpen 
}) {
  const [localPrice, setLocalPrice] = useState(filters.priceRange);
  const [openSection, setOpenSection] = useState("Price");

  useEffect(() => {
    setLocalPrice(filters.priceRange);
  }, [filters.priceRange]);

  const materials = ["Hand-Spun Wool", "Organic Silk", "Jute & Hemp", "Viscose Blend"];
  const sizes = ["2' x 3'", "4' x 6'", "5' x 8'", "8' x 10'", "9' x 12'", "Runner"];
  const colors = [
    { name: "Dark Red", hex: "#7B1E1E" },
    { name: "Cream", hex: "#F3EFE9" },
    { name: "Brown", hex: "#8B5A2B" },
    { name: "Dark Blue", hex: "#1A2B4C" },
    { name: "Taupe", hex: "#B3A294" }
  ];
  const shapes = ["Rectangle", "Round / Circular", "Oval"];

  const toggleSection = (section) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  const handleMaterialChange = (mat) => {
    setFilters(prev => {
      const newMaterials = prev.materials.includes(mat)
        ? prev.materials.filter(m => m !== mat)
        : [...prev.materials, mat];
      return { ...prev, materials: newMaterials, page: 1 };
    });
  };

  const handleSizeChange = (size) => {
    setFilters(prev => ({
      ...prev,
      size: prev.size === size ? null : size,
      page: 1
    }));
  };

  const handleColorChange = (colorName) => {
    setFilters(prev => ({
      ...prev,
      color: prev.color === colorName ? null : colorName,
      page: 1
    }));
  };

  const handleShapeChange = (shape) => {
    setFilters(prev => ({
      ...prev,
      shape: prev.shape === shape ? null : shape,
      page: 1
    }));
  };

  const handlePriceRelease = () => {
    setFilters(prev => ({ ...prev, priceRange: localPrice, page: 1 }));
  };

  const sidebarContent = (
    <div className="flex flex-col text-[#2B2B2B] pb-12 border-t border-[#E8DCD3]">
      {/* Price Filter */}
      <AccordionSection
        title="Price"
        isOpen={openSection === "Price"}
        onToggle={() => toggleSection("Price")}
        isActive={filters.priceRange < 5000}
      >
        <div className="flex justify-between text-sm font-sans text-[#666] mb-2">
          <span>₹0</span>
          <span>₹{localPrice}+</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="5000" 
          step="100"
          value={localPrice}
          onChange={(e) => setLocalPrice(Number(e.target.value))}
          onMouseUp={handlePriceRelease}
          onTouchEnd={handlePriceRelease}
          className="w-full accent-[#7B1E1E] h-1 bg-[#E8DCD3] rounded-lg appearance-none cursor-pointer"
        />
      </AccordionSection>

      {/* Material Filter */}
      <AccordionSection
        title="Material"
        isOpen={openSection === "Material"}
        onToggle={() => toggleSection("Material")}
        isActive={filters.materials.length > 0}
      >
        <div className="flex flex-col gap-3 font-sans text-sm">
          {materials.map(mat => (
            <label key={mat} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={filters.materials.includes(mat)} 
                onChange={() => handleMaterialChange(mat)} 
              />
              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                filters.materials.includes(mat) ? 'bg-[#7B1E1E] border-[#7B1E1E]' : 'border-[#E8DCD3] group-hover:border-[#7B1E1E]'
              }`}>
                {filters.materials.includes(mat) && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className={filters.materials.includes(mat) ? "font-semibold" : ""}>{mat}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      {/* Size Filter */}
      <AccordionSection
        title="Size"
        isOpen={openSection === "Size"}
        onToggle={() => toggleSection("Size")}
        isActive={filters.size !== null}
      >
        <div className="flex flex-wrap gap-2 font-sans text-sm">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-2 rounded-[12px] border transition-colors ${
                filters.size === size 
                  ? 'border-[#7B1E1E] bg-[#FAF7F4] text-[#7B1E1E] font-semibold' 
                  : 'border-[#E8DCD3] text-[#666] hover:border-[#7B1E1E]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </AccordionSection>

      {/* Color Filter */}
      <AccordionSection
        title="Color"
        isOpen={openSection === "Color"}
        onToggle={() => toggleSection("Color")}
        isActive={filters.color !== null}
      >
        <div className="flex flex-wrap gap-4">
          {colors.map(color => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color.name)}
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform ${
                filters.color === color.name ? 'border-[#7B1E1E] scale-110' : 'border-transparent hover:scale-110'
              }`}
              title={color.name}
            >
              <span 
                className="w-6 h-6 rounded-full block border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
      </AccordionSection>

      {/* Shape Filter */}
      <AccordionSection
        title="Rug Shape"
        isOpen={openSection === "Rug Shape"}
        onToggle={() => toggleSection("Rug Shape")}
        isActive={filters.shape !== null}
      >
        <div className="flex flex-col gap-3 font-sans text-sm">
          {shapes.map(shape => (
            <label key={shape} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={filters.shape === shape} 
                onChange={() => handleShapeChange(shape)} 
              />
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                filters.shape === shape ? 'border-[#7B1E1E]' : 'border-[#E8DCD3] group-hover:border-[#7B1E1E]'
              }`}>
                {filters.shape === shape && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7B1E1E]" />
                )}
              </div>
              <span className={filters.shape === shape ? "font-semibold" : ""}>{shape}</span>
            </label>
          ))}
        </div>
      </AccordionSection>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[320px] bg-[#FAF7F4] lg:bg-transparent border-r border-[#E8DCD3] lg:border-none shadow-2xl lg:shadow-none p-6 lg:p-0 overflow-y-auto transform transition-transform duration-300 ease-in-out lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:translate-x-0 lg:z-0 lg:w-[320px] lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <h2 className="font-serif text-2xl flex items-center gap-2 text-[#2B2B2B]">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-[#666] hover:text-[#7B1E1E] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {sidebarContent}
      </aside>
    </>
  );
}
