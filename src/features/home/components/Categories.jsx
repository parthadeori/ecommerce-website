"use client";

import React from "react";
import { categories } from "../data";
import { motion } from "framer-motion";

const Categories = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="flex gap-4 overflow-x-auto">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            className="min-w-[200px] flex-shrink-0 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-40 object-cover"
            />
            <h3 className="text-center font-semibold py-2">{cat.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
