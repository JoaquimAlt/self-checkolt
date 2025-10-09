import { getProductById } from "@/app/data/get-product-by-id";
import { notFound } from "next/navigation";
import React from "react";
import ProductHeader from "./components/product-header";
import ProductDescription from "./components/product-description";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductHeader product={product} />
      <ProductDescription product={product} />
    </div>
  );
}
