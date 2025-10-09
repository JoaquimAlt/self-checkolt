"use client";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ArrowLeft, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
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
        className="object-cover"
        fill
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
      />
      <Button
        className="absolute right-4 top-4 z-50 rounded-full"
        variant={"secondary"}
        size={"icon"}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}
