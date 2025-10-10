import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import CartSheetProduct from "./cart-sheet-product";

export default function ProductsCart() {
  const { isOpen, toggleCart, products } = useContext(CartContext);

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
          {products.length === 0 ? (
            <p className="text-center text-gray-500">Seu carrinho está vazio</p>
          ) : (
            <ul className="flex flex-col gap-5">
              {products.map((product) => (
                <CartSheetProduct key={product.id} product={product} />
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
