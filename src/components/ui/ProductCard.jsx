"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { WishlistContext } from "@/context/WishlistContext";
import { CompareContext } from "@/context/CompareContext";

const ProductCard = ({ product, view = "grid" }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const { addToCompare, removeFromCompare, isInCompare } =
    useContext(CompareContext);

  const handleWishlist = () => {
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  const handleCompare = () => {
    isInCompare(product.id)
      ? removeFromCompare(product.id)
      : addToCompare(product);
  };

  return (
    <motion.div
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer transition"
      whileHover={{ scale: 1.05 }}
    >
      <div
        className={`border rounded-lg p-4 shadow hover:shadow-lg transition flex ${
          view === "list" ? "flex-row gap-4" : "flex-col"
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`rounded-md ${
            view === "list"
              ? "w-40 h-40 object-cover"
              : "w-full h-48 object-cover mb-4"
          }`}
        />
        <div className={view === "list" ? "flex-1" : ""}>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-indigo-600 font-bold">₹{product.price}</p>
          <div className="flex justify-between items-center">
            <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer">
              Add to Cart
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleWishlist}
                title="Add to Wishlist"
                className="cursor-pointer"
              >
                {isInWishlist(product.id) ? "❤️" : "🤍"}
              </button>
              <button
                onClick={handleCompare}
                title="Add to Compare"
                className="cursor-pointer"
              >
                ⚖️
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
