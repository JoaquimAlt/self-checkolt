import React from "react";
import { CartProduct } from "../context/cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CartSheetProductProps {
  product: CartProduct;
}

export default function CartSheetProduct({ product }: CartSheetProductProps) {
  const incrementQuantity = () => {
    product.quantity++;
  };

  const decrementQuantity = () => {
    if (product.quantity === 1) return;
    product.quantity--;
  };

  return (
    <li className="flex flex-row gap-3">
      <Image
        className="object-cover"
        src={product.imageUrl}
        alt={product.name}
        width={60}
        height={60}
      />
      <div className="flex flex-col">
        <h2 className="line-clamp-1 text-xs font-normal">{product.name}</h2>
        <span className="font-semibold">R$ {product.price.toFixed(2)}</span>
        <div className="flex w-7 flex-row justify-between gap-2 text-center">
          <Button
            className="h-3 w-3 p-2"
            variant={product.quantity === 1 ? "outline" : "destructive"}
            disabled={product.quantity === 1}
            onClick={decrementQuantity}
          >
            <ChevronLeft />
          </Button>
          <span className="w-5 text-xs">{product.quantity}</span>
          <Button
            className="h-3 w-3 p-2"
            variant={"destructive"}
            onClick={incrementQuantity}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </li>
  );
}
