"use client";

import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer transition"
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-indigo-600 font-bold">₹{product.price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
