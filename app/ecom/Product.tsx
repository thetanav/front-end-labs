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
import { AnimatePresence, motion } from "motion/react";

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
        },
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
    <div className="group flex flex-col gap-4 p-4 rounded-3xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 select-none">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button type="button" className="w-full text-left overflow-hidden rounded-2xl">
            <div className="w-full aspect-square overflow-hidden relative">
              <motion.img
                src={product.strMealThumb}
                alt={product.strMeal}
                draggable={false}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium line-clamp-1">{product.strMeal}</p>
              </div>
            </div>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl rounded-3xl overflow-hidden border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight">{product.strMeal}</DialogTitle>
            <DialogDescription>
              View meal details and customize your order.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin text-primary" /> 
              <p className="text-sm font-medium animate-pulse">Fetching recipe secrets...</p>
            </div>
          ) : isError ? (
            <div className="p-10 text-center">
              <p className="text-sm text-destructive font-medium">Failed to load meal details.</p>
            </div>
          ) : !meal?.data ? (
            <p className="text-sm text-muted-foreground p-10 text-center">No details found.</p>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-6 py-4"
            >
              <div className="grid sm:grid-cols-[240px_1fr] gap-6">
                <img
                  src={meal.data.strMealThumb ?? product.strMealThumb}
                  alt={meal.data.strMeal ?? product.strMeal}
                  className="w-full aspect-square rounded-2xl object-cover shadow-lg"
                />

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Category</p>
                      <p className="text-sm font-medium">{meal.data.strCategory ?? "—"}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Origin</p>
                      <p className="text-sm font-medium">{meal.data.strArea ?? "—"}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold tracking-tight uppercase text-muted-foreground">Ingredients</h4>
                    {ingredients.length ? (
                      <div className="flex flex-wrap gap-2">
                        {ingredients.map(
                          (it: { ingredient: string; measure: string }) => (
                            <span 
                              key={`${it.ingredient}-${it.measure}`.trim()}
                              className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium text-primary"
                            >
                              {it.measure ? `${it.measure} ` : ""}
                              {it.ingredient}
                            </span>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">—</p>
                    )}
                  </div>
                </div>
              </div>

              {meal.data.strInstructions ? (
                <div className="space-y-3 p-6 rounded-2xl bg-muted/30 border border-border/50">
                  <h4 className="text-sm font-bold tracking-tight uppercase text-muted-foreground">Preparation</h4>
                  <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
                    {meal.data.strInstructions}
                  </p>
                </div>
              ) : null}
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/50">Recipe</span>
          <h3 className="text-sm font-bold tracking-tight truncate max-w-[140px]">{product.strMeal}</h3>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {count > 0 ? (
              <motion.div
                key="quantity-controls"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center bg-muted/50 rounded-full p-1 border border-border/50"
              >
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => decreaseCart(product.idMeal)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </motion.button>
                <span className="w-6 text-center text-xs font-bold">{count}</span>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => increaseCart(product.idMeal)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                key="add-btn"
                layoutId={`btn-${product.idMeal}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product.idMeal, product.strMeal, product.strMealThumb)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
