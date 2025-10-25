// ecommerce-website\src\context\ReviewsContext.jsx

"use client";
import React, { createContext, useState, useEffect } from "react";

export const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState({}); // { productId: [{name, rating, comment}] }

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("reviews");
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId, review) => {
    setReviews((prev) => ({
      ...prev,
      [productId]: prev[productId] ? [...prev[productId], review] : [review],
    }));
  };

  const getReviews = (productId) => reviews[productId] || [];

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};
