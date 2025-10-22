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
  const [view, setView] = useState("grid"); // "grid" or "list"

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch products
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

  // Filter + Sort
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
    setCurrentPage(1); // reset pagination on filter/sort change
  }, [sort, category, products]);

  if (loading)
    return <p className="text-center text-gray-500">Loading products...</p>;

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

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

      {/* View Toggle */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setView("grid")}
          className={`px-3 py-1 rounded border ${
            view === "grid" ? "bg-indigo-600 text-white" : "bg-white"
          }`}
        >
          🟦 Grid
        </button>
        <button
          onClick={() => setView("list")}
          className={`px-3 py-1 rounded border ${
            view === "list" ? "bg-indigo-600 text-white" : "bg-white"
          }`}
        >
          📄 List
        </button>
      </div>

      {/* Products Grid */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            // ✅ Pass view as prop
            <ProductCard key={product.id} product={product} view={view} />
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default ProductsPage;
