import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { CartProvider } from "@/context/CartContext";
import { ReviewsProvider } from "@/context/ReviewsContext";

export const metadata = {
  title: "E-Commerce App",
  description: "Next.js eCommerce demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WishlistProvider>
          <CompareProvider>
            <CartProvider>
              <ReviewsProvider>{children}</ReviewsProvider>
            </CartProvider>
          </CompareProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
