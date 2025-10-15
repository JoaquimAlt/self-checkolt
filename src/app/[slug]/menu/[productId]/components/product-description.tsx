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
  const { isOpen, toggleCart, addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => {
    if (quantity === 1) return 1;
    setQuantity((q) => q - 1);
  };

  const handleAddToCart = () => {
    if (!isOpen) {
      toggleCart();
      addToCart({ ...product, quantity });
    }
  };

  return (
    <>
      <ProductsCart />
      <div className="relative flex max-h-full flex-auto flex-col gap-4 p-5 md:p-10">
        <div className="flex flex-auto flex-col gap-4 md:gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1">
              <Image
                width={15}
                height={15}
                src={product.restaurant.avatarImageUrl}
                alt={product.restaurant.name}
                className="rounded-full md:h-7 md:w-7"
              />
              <p className="text-xs opacity-75 md:text-lg">
                {product.restaurant.name}
              </p>
            </div>
            <h2 className="md:text-2xl">{product.name}</h2>
          </div>
          <div className="flex flex-row max-md:justify-between md:gap-4">
            <span className="font-semibold md:text-4xl">
              R$ {product.price.toFixed(2)}
            </span>
            <div className="flex flex-row items-center justify-between gap-2 text-center">
              <Button
                className="h-6 p-1 md:h-10 md:w-10 md:rounded-xl"
                variant={quantity === 1 ? "secondary" : "destructive"}
                disabled={quantity === 1}
                onClick={decrementQuantity}
              >
                <ChevronLeft />
              </Button>
              <span className="flex h-full w-6 items-center justify-center md:text-lg">
                {quantity}
              </span>
              <Button
                className="h-6 p-1 md:h-10 md:w-10 md:rounded-xl"
                variant={"destructive"}
                onClick={incrementQuantity}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold md:text-lg">Sobre</h2>
            <p className="text-sm text-muted-foreground md:text-lg">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1">
              <ChefHat className="h-4 w-4 md:h-6 md:w-6" />
              <h2 className="text-sm font-semibold md:text-lg">Ingredientes</h2>
            </div>
            <ul className="list-inside list-disc px-1 text-sm text-muted-foreground md:text-lg">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full rounded-full md:text-lg"
          size={"lg"}
        >
          Adicionar {quantity} à sacola - R${" "}
          {(product.price * quantity).toFixed(2)}
        </Button>
      </div>
    </>
  );
}
