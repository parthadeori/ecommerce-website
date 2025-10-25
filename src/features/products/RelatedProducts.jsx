// ecommerce-website\src\features\products\RelatedProducts.jsx

"use client";
import React from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules"; // ← fixed import

const RelatedProducts = ({ category, currentProductId }) => {
  const related = products.filter(
    (p) => p.category === category && p.id !== currentProductId
  );

  if (related.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">🛍️ Related Products</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.5}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
        }}
        navigation
        modules={[Navigation]}
      >
        {related.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelatedProducts;
