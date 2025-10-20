import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          E-Shop
        </Link>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/auth/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
