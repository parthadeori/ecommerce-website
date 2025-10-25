// ecommerce-website\src\app\cart\page.jsx

"use client";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <Link href="/products" className="text-indigo-600 hover:underline">
          Browse Products
        </Link>
      </div>
    );

  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h1>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-center border rounded-lg p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0"
            />
            <div className="flex-1 md:ml-6">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:underline mt-2 md:mt-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Subtotal & Checkout */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6">
        <p className="text-xl font-semibold">Subtotal: ₹{subtotal}</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
