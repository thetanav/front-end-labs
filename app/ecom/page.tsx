"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { Fragment, useRef, useEffect, Suspense } from "react";
import { Product } from "./Product";
import { CartButton } from "./CartButton";
import { Loader, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";

function EcomContent() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["products", search],
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `https://api.freeapi.app/api/v1/public/meals?page=${pageParam}${
            search != "" ? "&query=" + search : ""
          }`
        );
        const data = await res.json();
        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.nextPage) {
          return lastPage.data.page + 1;
        }
        return undefined;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto px-4 pb-20">
      <nav className="w-full flex items-center justify-between border-b pb-4 pt-6 sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter"
        >
          FOODIE
        </motion.h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all focus:w-64"
            />
          </div>
          <CartButton />
        </div>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        <AnimatePresence mode="popLayout">
          {data &&
            data.pages.flatMap((page, pageIndex) => 
              page.data.data.map((product: any, productIndex: number) => (
                <motion.div
                  key={product.idMeal}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.23, 1, 0.32, 1],
                    delay: (productIndex % 9) * 0.05 
                  }}
                >
                  <Product product={product} />
                </motion.div>
              ))
            )}
        </AnimatePresence>
      </div>

      {status === 'pending' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-muted/20 animate-pulse" />
          ))}
        </div>
      )}

      <div
        ref={observerTarget}
        className="h-20 flex flex-col items-center justify-center gap-2 w-full pt-10"
      >
        {isFetchingNextPage ? (
          <>
            <Loader className="w-6 h-6 animate-spin text-primary" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Loading more</p>
          </>
        ) : (
          !hasNextPage && status !== 'pending' && (
            <p className="text-sm font-medium text-muted-foreground/50 italic">That's all the deliciousness for now</p>
          )
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <EcomContent />
    </Suspense>
  );
}
