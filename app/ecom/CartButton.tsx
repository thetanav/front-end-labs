import { Button } from "@/components/ui/button";
import useCart from "@/lib/store";
import { ShoppingCart, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
  const removeFromCart = useCart((state) => state.removeFromCart);
  const total = getTotal();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="relative group overflow-hidden rounded-full px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
          <motion.div
            animate={{ 
              scale: total > 0 ? [1, 1.2, 1] : 1,
              rotate: total > 0 ? [0, -10, 10, 0] : 0
            }}
            transition={{ duration: 0.4 }}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
          </motion.div>
          <span className="font-bold tracking-tight">Cart</span>
          <AnimatePresence>
            {total > 0 && (
              <motion.span 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="ml-2 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary rounded-full text-[10px] font-black transition-colors"
              >
                {total}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tighter">YOUR BAG</DialogTitle>
          <DialogDescription>
            {total === 0 ? "Your bag is currently empty." : `You have ${total} items in your bag.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout" initial={false}>
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground/50"
              >
                <ShoppingBag className="w-12 h-12 stroke-[1]" />
                <p className="text-sm font-medium italic">Empty and hungry...</p>
              </motion.div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  className="group flex items-center gap-4 p-3 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{item.name}</p>
                    <p className="text-xs font-black text-primary uppercase tracking-widest mt-0.5">
                      QTY: {item.count}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, color: "var(--destructive)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-muted-foreground/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        {total > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 mt-2 border-t"
          >
            <Button className="w-full h-12 rounded-2xl font-bold tracking-tight text-base shadow-xl shadow-primary/20">
              Checkout Now
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};
