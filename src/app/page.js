// ecommerce-website\src\app\page.js

import Layout from "@/components/layout/Layout";
import Hero from "@/features/home/components/Hero";
import Categories from "@/features/home/components/Categories";
import FeaturedProducts from "@/features/home/components/FeaturedProducts";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </Layout>
  );
}
