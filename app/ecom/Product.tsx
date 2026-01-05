import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import useCart from "@/lib/store";
import { Minus, Plus, ShoppingCart } from "lucide-react";

export const Product = ({ product }: { product: any }) => {
  const addToCart = useCart((state) => state.addToCart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const increaseCart = useCart((state) => state.increaseCart);
  const decreaseCart = useCart((state) => state.decreaseCart);
  const cart = useCart((state) => state.cart);
  const cartItem = cart.find((item) => item.id === product.idMeal);
  const count = cartItem ? cartItem.count : 0;

  return (
    <div className="flex flex-col gap-2 p-2 select-none">
      <div className="w-full min-h-36 shrink-0">
        <img
          src={product.strMealThumb}
          draggable={false}
          className="hover:brightness-90 active:scale-95 squi"
        />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg">{product.strMeal}</h2>

        {count ? (
          <ButtonGroup>
            <Button
              variant={"outline"}
              size="icon-sm"
              onClick={() => decreaseCart(product.idMeal)}>
              <Minus />
            </Button>
            <Button variant={"outline"} size={"icon-sm"}>
              {count}
            </Button>
            <Button
              variant={"outline"}
              size="icon-sm"
              onClick={() => increaseCart(product.idMeal)}>
              <Plus />
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant={"outline"}
            size="icon-sm"
            onClick={() =>
              addToCart(product.idMeal, product.strMeal, product.strMealThumb)
            }>
            <ShoppingCart />
          </Button>
        )}
      </div>
    </div>
  );
};
