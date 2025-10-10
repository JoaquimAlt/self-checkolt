"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ArrowLeft, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <div className="relative h-72 w-full">
        <Button
          className="absolute left-4 top-4 z-50 rounded-full"
          variant={"secondary"}
          size={"icon"}
          onClick={handleBackClick}
        >
          <ArrowLeft />
        </Button>
        <Image
          className="object-contain"
          fill
          src={product.imageUrl}
          alt={product.name}
        />
        <Button
          className="absolute right-4 top-4 z-50 rounded-full"
          variant={"secondary"}
          size={"icon"}
        >
          <ScrollTextIcon />
        </Button>
      </div>
    </>
  );
}
