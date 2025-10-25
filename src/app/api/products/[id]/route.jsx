// ecommerce-website\src\app\api\products\[id]\route.jsx

import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(req, context) {
  const { params } = context; // still inside context
  const { id } = await params; // ✅ await params
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
