import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface ProductsCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductsCardProps) {
  const { slug } = useParams<{ slug: string }>();

  return (
    <Card className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <Link href={`/${slug}/menu/${product.id}`}>
        <CardContent className="flex flex-row items-center justify-between gap-6 border-none py-5">
          <div className="flex flex-col items-start">
            <h2 className="text-sm">{product.name}</h2>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <span className="font-semibold">R$ {product.price.toFixed(2)}</span>
          </div>
          <Image
            width={70}
            height={70}
            src={product.imageUrl}
            alt={product.name}
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </CardContent>
      </Link>
    </Card>
  );
}
