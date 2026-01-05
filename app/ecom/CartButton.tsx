import { Button } from "@/components/ui/button";
import useCart from "@/lib/store";
import { ShoppingCart } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CartButton = () => {
  const cart = useCart((state) => state.cart);
  const getTotal = useCart((state) => state.getTotal);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="relative">
          <ShoppingCart /> My Cart
          <p className="absolute -top-2 -right-2 font-mono px-1 py-0 bg-blue-500 rounded-full text-background">
            {getTotal()}
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your cart</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2 rounded-lg border">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.count}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
