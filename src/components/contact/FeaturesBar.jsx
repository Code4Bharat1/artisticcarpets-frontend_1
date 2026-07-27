"use client";

import React from "react";
import { Compass, Truck, Wrench, Globe } from "lucide-react";
import Container from "@/components/common/Container";
import FeatureCard from "@/components/common/FeatureCard";

const FEATURES = [
  {
    id: "consultation",
    title: "Expert Consultation",
    icon: Compass,
  },
  {
    id: "shipping",
    title: "Free Shipping",
    icon: Truck,
  },
  {
    id: "care",
    title: "Artisanal Care",
    icon: Wrench,
  },
  {
    id: "delivery",
    title: "Global Delivery",
    icon: Globe,
  },
];

export default function FeaturesBar() {
  return (
    <section className="bg-white border-b border-[#E8E3DD]/60 py-10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 divide-[#E8E3DD]/40">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="pt-4 md:pt-0">
              <FeatureCard
                title={feature.title}
                icon={feature.icon}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
