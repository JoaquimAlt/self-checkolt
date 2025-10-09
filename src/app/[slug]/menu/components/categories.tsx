"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ProductCard from "./product-card";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: { menuCategories: { include: { products: true } } };
  }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

export default function RestaurantCategories({
  restaurant,
}: RestaurantCategoriesProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);

  const handleSelectCategory = (categoryId: MenuCategoryWithProducts) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Image
            width={50}
            height={50}
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
          />
          <div className="flex flex-col">
            <h2 className="font-bold">{restaurant.name}</h2>
            <p className="text-sm opacity-75">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-row items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto</p>
        </div>
      </div>

      <ScrollArea className="w-full px-4 pb-6">
        <div className="flex w-max space-x-4">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={
                category.id === selectedCategory.id ? "default" : "secondary"
              }
              className="mr-2 rounded-full"
              onClick={() => handleSelectCategory(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="w-full px-6 py-2 font-bold">{selectedCategory.name}</h2>
        <div className="flex flex-col gap-1">
          {selectedCategory.products.length > 0 &&
            selectedCategory.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
