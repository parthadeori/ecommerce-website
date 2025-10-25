// ecommerce-website\src\app\checkout\page.jsx

"use client";
import { useState, useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Address form state
  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  if (cartItems.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <p>Please add products to checkout.</p>
      </div>
    );

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handlePlaceOrder = () => {
    // Mock payment & order placement
    alert("Order placed successfully! 🎉");
    clearCart();
    router.push("/"); // Redirect to home
  };

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">💳 Checkout</h1>

      {/* Step Indicators */}
      <div className="flex justify-between mb-8">
        <span
          className={`font-semibold ${step === 1 ? "text-indigo-600" : ""}`}
        >
          1. Address
        </span>
        <span
          className={`font-semibold ${step === 2 ? "text-indigo-600" : ""}`}
        >
          2. Payment
        </span>
        <span
          className={`font-semibold ${step === 3 ? "text-indigo-600" : ""}`}
        >
          3. Confirm
        </span>
      </div>

      {/* Step 1: Address */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          {[
            "name",
            "email",
            "phone",
            "street",
            "city",
            "state",
            "zip",
            "country",
          ].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={address[field]}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          ))}
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mt-4"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">Mock Payment Method:</p>
          <select className="border p-2 rounded">
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Confirm Your Order</h2>
          <div className="border p-4 rounded">
            <h3 className="font-semibold">Shipping Info:</h3>
            <p>{address.name}</p>
            <p>{address.email}</p>
            <p>{address.phone}</p>
            <p>
              {address.street}, {address.city}, {address.state}, {address.zip},{" "}
              {address.country}
            </p>
          </div>

          <div className="border p-4 rounded mt-2">
            <h3 className="font-semibold">Products:</h3>
            {cartItems.map((item) => (
              <p key={item.id}>
                {item.name} x {item.quantity} = ₹{item.price * item.quantity}
              </p>
            ))}
            <p className="font-semibold mt-2">
              Total: ₹
              {cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0)}
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CheckoutPage;
