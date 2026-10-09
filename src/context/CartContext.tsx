/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "../data/products";

type CartLine = { id: number; qty: number };
export type CartItem = Product & { qty: number };

type CartValue = {
  items: CartItem[];
  count: number; // total number of pieces (shown on the header badge)
  total: number; // total price
  addItem: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "cozyloops-cart";
const MAX_QTY = 99;

const CartContext = createContext<CartValue | null>(null);

function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine => !!l && typeof l.id === "number" && typeof l.qty === "number" && l.qty > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadLines);

  // Keep the cart after a page refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage can be blocked; the cart still works for this visit */
    }
  }, [lines]);

  const value = useMemo<CartValue>(() => {
    const items: CartItem[] = lines.flatMap((l) => {
      const p = products.find((x) => x.id === l.id);
      return p ? [{ ...p, qty: l.qty }] : [];
    });

    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
      addItem: (id) =>
        setLines((ls) =>
          ls.some((l) => l.id === id)
            ? ls.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l))
            : [...ls, { id, qty: 1 }],
        ),
      setQty: (id, qty) =>
        setLines((ls) =>
          qty <= 0
            ? ls.filter((l) => l.id !== id)
            : ls.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l)),
        ),
      removeItem: (id) => setLines((ls) => ls.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}