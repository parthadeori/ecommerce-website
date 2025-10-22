"use client";
import React, { createContext, useState, useEffect } from "react";

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("compare");
    if (saved) setCompareList(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product) => {
    if (!compareList.find((item) => item.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter((item) => item.id !== id));
  };

  const isInCompare = (id) => compareList.some((item) => item.id === id);

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};
