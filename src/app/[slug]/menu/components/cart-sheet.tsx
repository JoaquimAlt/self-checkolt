import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import CartSheetProduct from "./cart-sheet-product";
import FinishOrderDialog from "./finish-order-dialog";

export default function ProductsCart() {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="h-full w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left text-sm">Seu Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-6">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">Seu carrinho está vazio</p>
          ) : (
            <>
              <ul className="flex-auto space-y-2">
                {products.map((product) => (
                  <CartSheetProduct key={product.id} product={product} />
                ))}
              </ul>
              <div className="mt-4 flex flex-row items-center justify-between border-t pt-4">
                <span className="text-sm">Total:</span>
                <span className="font-semibold">R$ {total.toFixed(2)}</span>
              </div>
              <FinishOrderDialog />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
