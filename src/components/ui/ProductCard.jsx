// ecommerce-website\src\components\ui\ProductCard.jsx

"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { WishlistContext } from "@/context/WishlistContext";
import { CompareContext } from "@/context/CompareContext";

const ProductCard = ({ product, view = "grid" }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const { addToCompare, removeFromCompare, isInCompare } =
    useContext(CompareContext);

  const handleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isInCompare(product.id)
      ? removeFromCompare(product.id)
      : addToCompare(product);
  };

  return (
    <motion.div
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer transition"
      whileHover={{ scale: 1.03 }}
    >
      <Link
        href={`/products/${product.id}`}
        className={`block p-4 ${
          view === "list" ? "flex flex-row gap-4 items-center" : "flex flex-col"
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`rounded-md ${
            view === "list"
              ? "w-40 h-40 object-cover flex-shrink-0"
              : "w-full h-48 object-cover mb-4"
          }`}
        />

        <div className={view === "list" ? "flex-1" : ""}>
          <h3 className="font-semibold text-lg hover:text-indigo-600">
            {product.name}
          </h3>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-indigo-600 font-bold mt-1">₹{product.price}</p>

          <div className="flex justify-between items-center mt-3">
            <button
              className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
              onClick={(e) => {
                e.preventDefault();
                // we'll connect this to AddToCart context soon
                alert(`Added ${product.name} to cart!`);
              }}
            >
              Add to Cart
            </button>

            <div className="flex gap-3 text-xl">
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
      </Link>
    </motion.div>
  );
};

export default ProductCard;
