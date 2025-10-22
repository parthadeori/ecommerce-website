import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";

export const metadata = {
  title: "E-Commerce App",
  description: "Next.js eCommerce demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WishlistProvider>
          <CompareProvider>{children}</CompareProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
