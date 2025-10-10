import React, { useContext } from "react";
import { CartContext, CartProduct } from "../context/cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";

interface CartSheetProductProps {
  product: CartProduct;
}

export default function CartSheetProduct({ product }: CartSheetProductProps) {
  const { addToCart, decreaseFromCart, removeFromCart } =
    useContext(CartContext);

  return (
    <li className="flex flex-row items-center gap-3 py-1">
      <div className="relative h-14 min-w-14 rounded-sm bg-gray-200">
        <Image
          className="object-cover"
          src={product.imageUrl}
          alt={product.name}
          fill
        />
      </div>
      <div className="flex flex-col">
        <h2 className="line-clamp-1 text-xs font-normal">{product.name}</h2>
        <span className="font-semibold">R$ {product.price.toFixed(2)}</span>
        <div className="flex w-7 flex-row justify-between gap-2 text-center">
          <Button
            className="h-3 w-3 p-2"
            variant={product.quantity === 1 ? "outline" : "destructive"}
            disabled={product.quantity === 1}
            onClick={() => decreaseFromCart(product.id)}
          >
            <ChevronLeft />
          </Button>
          <span className="w-5 text-xs">{product.quantity}</span>
          <Button
            className="h-3 w-3 p-2"
            variant={"destructive"}
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <Button
        onClick={() => removeFromCart(product.id)}
        variant={"outline"}
        className="h-6 w-6"
      >
        <TrashIcon />
      </Button>
    </li>
  );
}
