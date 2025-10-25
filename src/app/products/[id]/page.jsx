// ecommerce-website\src\app\products\[id]\page.jsx

"use client";
import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import RelatedProducts from "@/features/products/RelatedProducts";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); // Cart context

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`reviews-${id}`);
    if (saved) setReviews(JSON.parse(saved));
  }, [id]);

  // Save reviews whenever they change
  useEffect(() => {
    localStorage.setItem(`reviews-${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  // Handle adding a new review
  const handleAddReview = () => {
    if (!newReview.name || !newReview.comment) {
      alert("Please enter your name and comment");
      return;
    }
    setReviews([
      ...reviews,
      { ...newReview, date: new Date().toLocaleString() },
    ]);
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Loading product...</p>
    );

  if (!product)
    return <p className="text-center py-10 text-red-500">Product not found.</p>;

  return (
    <>
      <section className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl w-full max-w-md h-auto shadow-md"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-2xl font-semibold text-indigo-600">
            ₹{product.price}
          </p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">⭐</span>
            <p className="text-gray-600">
              {product.rating} / 5 ({product.reviews} reviews)
            </p>
          </div>

          {/* Add to Cart / Buy Now */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700"
            >
              Add to Cart
            </button>
            <button className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700">
              Buy Now
            </button>
          </div>

          {/* Back to Products */}
          <Link
            href="/products"
            className="mt-6 text-indigo-600 hover:underline text-sm"
          >
            ← Back to Products
          </Link>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">💬 Reviews</h2>

        {/* Add New Review */}
        <div className="border p-4 rounded mb-6">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) =>
              setNewReview({ ...newReview, name: e.target.value })
            }
            className="border p-2 rounded w-full mb-2"
          />
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: Number(e.target.value) })
            }
            className="border p-2 rounded w-full mb-2"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Stars
              </option>
            ))}
          </select>
          <textarea
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleAddReview}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Review
          </button>
        </div>

        {/* Display Reviews */}
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((rev, index) => (
              <div key={index} className="border p-4 rounded">
                <p className="font-semibold">
                  {rev.name} - {rev.rating} ⭐
                </p>
                <p className="text-gray-600 text-sm">{rev.date}</p>
                <p>{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="mt-10 max-w-6xl mx-auto px-4">
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      </section>
    </>
  );
};

export default ProductDetailsPage;
