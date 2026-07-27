"use client";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } }
};

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-[#666] font-sans bg-white border border-[#E8DCD3] rounded-[12px]">
        <p className="text-lg">No rugs found matching your filters.</p>
        <p className="text-sm mt-2">Try adjusting your criteria to see more results.</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[32px]"
    >
      {products.map((product, index) => (
        <motion.div key={product.id ? `${product.id}-${index}` : index} variants={item}>
          <ProductCard product={product} priority={index < 6} />
        </motion.div>
      ))}
    </motion.div>
  );
}
