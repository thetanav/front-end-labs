"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { Fragment, useRef, useEffect } from "react";
import { Product } from "./Product";
import { CartButton } from "./CartButton";
import { Loader } from "lucide-react";

export default function Page() {
  const [search] = useQueryState("q", parseAsString.withDefault(""));
  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
        } else {
          return lastPage.data.page;
        }
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
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
    <div className="flex flex-col items-center justify-center gap-4 max-w-3xl mx-auto">
      <nav className="w-full flex items-center justify-between border-b pb-4 pt-4 sticky top-0 left-0 right-0 bg-background backdrop-blur-3xl z-50">
        <h1 className="text-lg font-bold">Foodie</h1>
        <CartButton />
      </nav>
      <div className="grid grid-cols-3">
        {data &&
          data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.data.data.map((product: any) => (
                <Product key={product.idMeal} product={product} />
              ))}
            </Fragment>
          ))}
      </div>
      <div
        ref={observerTarget}
        className="h-10 flex items-center justify-center">
        {isFetchingNextPage ? (
          <Loader className="w-4 h-4 animate-spin text-muted-foreground" />
        ) : (
          !hasNextPage && <p>No more pages</p>
        )}
      </div>
    </div>
  );
}
