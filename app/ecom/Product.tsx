import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import useCart from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

type MealDetails = {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

function getIngredients(meal: MealDetails) {
  const items: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = String(meal[`strIngredient${i}`] ?? "").trim();
    const measure = String(meal[`strMeasure${i}`] ?? "").trim();
    if (!ingredient) continue;
    items.push({ ingredient, measure });
  }
  return items;
}

type MealListItem = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export const Product = ({ product }: { product: MealListItem }) => {
  const addToCart = useCart((state) => state.addToCart);
  const increaseCart = useCart((state) => state.increaseCart);
  const decreaseCart = useCart((state) => state.decreaseCart);
  const cart = useCart((state) => state.cart);
  const cartItem = cart.find((item) => item.id === product.idMeal);
  const count = cartItem ? cartItem.count : 0;

  const [open, setOpen] = useState(false);

  const {
    data: meal,
    isLoading,
    isError,
  } = useQuery<{ data: MealDetails }>({
    queryKey: ["meal", product.idMeal],
    enabled: open,
    queryFn: async () => {
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/meals/${product.idMeal}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch meal details");
      }
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  const ingredients = meal?.data ? getIngredients(meal.data) : [];

  return (
    <div className="flex flex-col gap-2 p-2 select-none">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button type="button" className="w-full text-left">
            <div className="w-full min-h-36 shrink-0">
              <img
                src={product.strMealThumb}
                alt={product.strMeal}
                draggable={false}
                className={cn(
                  "w-full rounded-md hover:brightness-90 active:scale-95 transition",
                  "squi"
                )}
              />
            </div>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{product.strMeal}</DialogTitle>
            <DialogDescription>
              Click image to view details. Add to cart anytime.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading details
            </div>
          ) : isError ? (
            <p className="text-sm text-destructive">Failed to load meal details.</p>
          ) : !meal?.data ? (
            <p className="text-sm text-muted-foreground">No details found.</p>
          ) : (
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-[220px_1fr] gap-4">
                <img
                  src={meal.data.strMealThumb ?? product.strMealThumb}
                  alt={meal.data.strMeal ?? product.strMeal}
                  className="w-full rounded-md object-cover"
                />

                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <span className="font-medium text-foreground">
                        Category:
                      </span>{" "}
                      {meal.data.strCategory ?? "—"}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Area:</span>{" "}
                      {meal.data.strArea ?? "—"}
                    </p>
                    {meal.data.strTags ? (
                      <p>
                        <span className="font-medium text-foreground">Tags:</span>{" "}
                        {meal.data.strTags}
                      </p>
                    ) : null}
                    {meal.data.strYoutube ? (
                      <a
                        href={meal.data.strYoutube}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4"
                      >
                        Watch on YouTube
                      </a>
                    ) : null}
                  </div>

                  <div>
                    <p className="text-sm font-medium">Ingredients</p>
                    {ingredients.length ? (
                      <ul className="text-sm text-muted-foreground list-disc pl-5">
                        {ingredients.map(
                          (it: { ingredient: string; measure: string }) => (
                            <li key={`${it.ingredient}-${it.measure}`.trim()}>
                              {it.measure ? `${it.measure} ` : ""}
                              {it.ingredient}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">—</p>
                    )}
                  </div>
                </div>
              </div>

              {meal.data.strInstructions ? (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Instructions</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {meal.data.strInstructions}
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between">
        <h2 className="text-lg">{product.strMeal}</h2>

        {count ? (
          <ButtonGroup>
            <Button
              variant={"outline"}
              size="icon-sm"
              onClick={() => decreaseCart(product.idMeal)}
            >
              <Minus />
            </Button>
            <Button variant={"outline"} size={"icon-sm"}>
              {count}
            </Button>
            <Button
              variant={"outline"}
              size="icon-sm"
              onClick={() => increaseCart(product.idMeal)}
            >
              <Plus />
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant={"outline"}
            size="icon-sm"
            onClick={() =>
              addToCart(product.idMeal, product.strMeal, product.strMealThumb)
            }
          >
            <ShoppingCart />
          </Button>
        )}
      </div>
    </div>
  );
};
