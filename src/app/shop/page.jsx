"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import Container from "@/components/common/Container";
import ShopSidebar from "@/components/shop/ShopSidebar";
import ShopHeader from "@/components/shop/ShopHeader";
import ProductGrid from "@/components/shop/ProductGrid";
import Pagination from "@/components/shop/Pagination";
import Navbar from "@/components/layout/Navbar";


function ShopContent() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("featured");
  const [filters, setFilters] = useState({
    priceRange: 5000,
    materials: [],
    size: null,
    color: null,
    shape: null,
    page: 1
  });

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?status=active&limit=500"); // Fetch all active for client-side filtering
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.data?.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (searchParam) {
        const query = searchParam.toLowerCase();
        const matchesTitle = product.title?.toLowerCase().includes(query) || product.name?.toLowerCase().includes(query);
        const matchesSku = product.sku?.toLowerCase().includes(query);
        const matchesCategory = product.category?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSku && !matchesCategory) {
          return false;
        }
      }
      
      if (product.price > filters.priceRange) return false;
      if (filters.materials.length > 0 && !filters.materials.includes(product.material)) return false;
      if (filters.size && product.size !== filters.size) return false;
      if (filters.color && product.color !== filters.color) return false;
      if (filters.shape && product.shape !== filters.shape) return false;
      return true;
    });
  }, [filters, products, searchParam]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (currentSort) {
      case "price_asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => (b.ratingAverage || 0) - (a.ratingAverage || 0));
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "featured":
      default:
        return sorted;
    }
  }, [filteredProducts, currentSort]);

  // Pagination Logic
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  
  // Ensure current page is valid after filtering
  const currentPage = Math.min(filters.page, Math.max(1, totalPages));
  
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center bg-[#FAF7F4]">
        <Navbar/>
        <Loader2 className="w-10 h-10 animate-spin text-[#7B1E1E]" />
        <p className="mt-4 text-[#666]">Loading Collections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center bg-[#FAF7F4] text-red-500">
        <Navbar/>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="pt-32 pb-24 bg-[#FAF7F4] min-h-screen font-sans"
    >
      <Navbar/>
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          
          {/* Sidebar */}
          <ShopSidebar 
            filters={filters}
            setFilters={setFilters}
            isOpen={isMobileFiltersOpen}
            setIsOpen={setIsMobileFiltersOpen}
          />

          {/* Main Content */}
          <div className="flex-1 w-full lg:max-w-[calc(100%-320px-3rem)]">
            <ShopHeader 
              totalItems={totalItems}
              startItem={startItem}
              endItem={endItem}
              currentSort={currentSort}
              onSortChange={setCurrentSort}
            />

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6 flex justify-end">
              <button 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DCD3] rounded-[12px] text-[#2B2B2B] font-semibold hover:border-[#7B1E1E] hover:text-[#7B1E1E] transition-colors shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {currentProducts.length > 0 ? (
              <ProductGrid products={currentProducts} />
            ) : (
              <div className="py-20 text-center text-[#666]">
                <p className="text-xl">No products found matching your filters.</p>
                <button 
                  onClick={() => setFilters({ priceRange: 5000, materials: [], size: null, color: null, shape: null, page: 1 })}
                  className="mt-4 px-6 py-2 bg-[#7B1E1E] text-white rounded-lg hover:bg-[#5A1616] transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={(page) => {
                  setFilters(prev => ({ ...prev, page }));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            )}
          </div>
          
        </div>
      </Container>
    </motion.div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF7F4]"><Loader2 className="w-10 h-10 animate-spin text-[#7B1E1E]" /></div>}>
      <ShopContent />
    </Suspense>
  );
}
