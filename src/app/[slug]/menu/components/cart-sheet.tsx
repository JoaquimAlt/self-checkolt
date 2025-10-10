import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import React, { useContext } from "react";
import { CartContext } from "../context/cart";

export default function ProductsCart() {
  const { isOpen, toggleCart } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
          <SheetDescription>
            Revise seus itens antes de finalizar o pedido.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <p className="text-center text-gray-500">Seu carrinho está vazio</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
