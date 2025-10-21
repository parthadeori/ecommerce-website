// ecommerce-website\src\app\products\page.jsx

"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch all products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let updated = [...products];

    if (category !== "All") {
      updated = updated.filter((p) => p.category === category);
    }

    if (sort === "low-high") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      updated.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      updated.sort((a, b) => b.rating - a.rating);
    }

    setFiltered(updated);
  }, [sort, category, products]);

  if (loading)
    return <p className="text-center text-gray-500">Loading products...</p>;

  return (
    <main className="py-16 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">🛍️ All Products</h1>

      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Wearables">Wearables</option>
          <option value="Footwear">Footwear</option>
        </select>

        <select
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
