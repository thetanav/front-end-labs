import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  count: number;
  thumbnail: string;
};

type Cart = CartItem[];

type CartStore = {
  cart: Cart;
  getTotal: () => number;
  addToCart: (id: string, name: string, thumbnail: string) => void;
  removeFromCart: (id: string) => void;
  increaseCart: (id: string) => void;
  decreaseCart: (id: string) => void;
};

const useCart = create<CartStore>((set, get) => ({
  cart: [],
  getTotal: () => get().cart.reduce((acc, item) => acc + item.count, 0),
  addToCart: (id: string, name: string, thumbnail: string) =>
    set((state) => {
      const existingItem = state.cart.find((itm) => itm.id === id);
      if (existingItem) {
        return {
          cart: state.cart.map((itm) =>
            itm.id === id ? { ...itm, count: itm.count + 1 } : itm
          ),
        };
      }
      return {
        cart: [
          ...state.cart,
          {
            id,
            name,
            thumbnail,
            count: 1,
          },
        ],
      };
    }),
  increaseCart: (id: string) =>
    set((state) => ({
      cart: state.cart.map((itm) =>
        itm.id === id ? { ...itm, count: itm.count + 1 } : itm
      ),
    })),
  decreaseCart: (id: string) =>
    set((state) => ({
      cart: state.cart
        .map((itm) => (itm.id === id ? { ...itm, count: itm.count - 1 } : itm))
        .filter((itm) => itm.count > 0),
    })),
  removeFromCart: (id: string) =>
    set((state) => ({
      cart: state.cart.filter((itm) => itm.id !== id),
    })),
}));

export default useCart;
