"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  toggleCart: () => void;
  addToCart: (product: CartProduct) => void;
  decreaseFromCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  total: 0,
  toggleCart: () => {},
  addToCart: () => {},
  decreaseFromCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const total = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = (product: CartProduct) => {
    const productAlreadyInCart = products.find((p) => p.id === product.id);
    if (productAlreadyInCart) {
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id === product.id
            ? {
                ...prevProduct,
                quantity: prevProduct.quantity + product.quantity,
              }
            : prevProduct,
        ),
      );
    } else {
      setProducts((prevProducts) => [...prevProducts, product]);
    }
  };

  const decreaseFromCart = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((prevProduct) =>
        prevProduct.id === productId && prevProduct.quantity > 1
          ? { ...prevProduct, quantity: prevProduct.quantity - 1 }
          : prevProduct,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        total,
        toggleCart,
        addToCart,
        decreaseFromCart,
        removeFromCart,
      }}
    >
      <div suppressHydrationWarning>{children}</div>
    </CartContext.Provider>
  );
};
