"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/services/productService";
import Container from "@/components/common/Container";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";

export default function FeaturedProducts({ data }) {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const productIds = data?.data?.products || [];
        const fetchedData = await fetchProducts(productIds);
        if (active) {
          setProducts(fetchedData);
          setIsLoading(false);
        }
      } catch (err) {
        if (active) {
          setIsError(true);
          setIsLoading(false);
        }
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [data]);

  return (
    <section id="highlights" className="bg-brand-white py-24">
      <Container>
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-custom pb-6 mb-12">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary font-medium tracking-tight">
              {data?.title || "Curated Highlights"}
            </h2>
            <p className="font-sans text-sm text-text-secondary font-light">
              {data?.content || "Hand-selected masterpieces from our latest arrivals."}
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center text-xs font-semibold tracking-widest uppercase text-text-primary hover:text-primary-brand mt-4 md:mt-0 transition-colors duration-300"
          >
            View All Products
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3,].map((skeleton) => (
              <div key={skeleton} className="flex flex-col space-y-4 animate-pulse">
                <div className="aspect-[4/5] w-full rounded-2xl bg-collection-bg/60" />
                <div className="flex justify-between">
                  <div className="h-5 bg-collection-bg/80 rounded w-1/2" />
                  <div className="h-5 bg-collection-bg/80 rounded w-1/4" />
                </div>
                <div className="h-4 bg-collection-bg/80 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12 text-sm text-primary-brand">
            Failed to load products. Please refresh and try again.
          </div>
        )}

        {/* Products Grid */}
        {products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
