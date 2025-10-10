"use client";

import { Button } from "@/components/ui/button";
import { ChefHat, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Prisma } from "@prisma/client";
import { CartContext } from "../../context/cart";
import ProductsCart from "../../components/cart-sheet";

interface ProductDescriptionProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true; avatarImageUrl: true } } };
  }>;
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  const { isOpen, toggleCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => {
    if (quantity === 1) return 1;
    setQuantity((q) => q - 1);
  };

  const handleAddToCart = () => {
    if (!isOpen) {
      toggleCart();
    }
  };

  return (
    <>
      <ProductsCart />
      <div className="relative flex h-full flex-auto flex-col gap-4 p-5">
        <div className="flex flex-auto flex-col gap-4">
          <div>
            <div className="flex flex-row items-center gap-1">
              <Image
                width={15}
                height={15}
                src={product.restaurant.avatarImageUrl}
                alt={product.restaurant.name}
                className="rounded-full"
              />
              <p className="text-xs opacity-75">{product.restaurant.name}</p>
            </div>
            <h2>{product.name}</h2>
          </div>
          <div className="flex flex-row justify-between">
            <span className="font-semibold">R$ {product.price.toFixed(2)}</span>
            <div className="flex flex-row justify-between gap-2 text-center">
              <Button
                className="h-6 p-1"
                variant={quantity === 1 ? "outline" : "destructive"}
                disabled={quantity === 1}
                onClick={decrementQuantity}
              >
                <ChevronLeft />
              </Button>
              <span className="w-5">{quantity}</span>
              <Button
                className="h-6 p-1"
                variant={"destructive"}
                onClick={incrementQuantity}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">Sobre</h2>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1">
              <ChefHat size={16} />
              <h2 className="text-sm font-semibold">Ingredientes</h2>
            </div>
            <ul className="list-inside list-disc px-1 text-sm text-muted-foreground">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full rounded-full"
          size={"lg"}
        >
          Adicionar {quantity} à sacola - R${" "}
          {(product.price * quantity).toFixed(2)}
        </Button>
      </div>
    </>
  );
}
