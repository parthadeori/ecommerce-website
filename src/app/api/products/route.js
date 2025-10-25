// ecommerce-website\src\app\api\products\route.js

import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET() {
  return NextResponse.json(products);
}
