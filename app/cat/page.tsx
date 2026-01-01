"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Loader,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState, Suspense } from "react";

function CatContent() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  const [meta, setMeta] = useState({
    data: false,
    limit: 0,
    totalItems: 0,
    page: 0,
    totalPages: 0,
    nextPage: false,
    previousPage: false,
  });

  const StatBar = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-28 text-muted-foreground">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="w-6 text-right font-medium">{value}/5</span>
    </div>
  );

  const StatBadge = ({ value, label }: { value: number; label: string }) =>
    value === 1 && (
      <Badge variant="outline" className="text-xs">
        {label}
      </Badge>
    );

  const { data, isLoading } = useQuery({
    queryKey: ["cats", search, page],
    queryFn: async () => {
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/cats?page=${page}${
          search?.trim() != "" ? `&query=${search}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      const data = await res.json();
      setMeta({
        data: true,
        limit: data.data.limit,
        totalItems: data.data.totalItems,
        page: data.data.page,
        totalPages: data.data.totalPages,
        nextPage: data.data.nextPage,
        previousPage: data.data.previousPage,
      });
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="pt-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between relative">
        <Input
          placeholder="Search"
          className="flex-1"
          onChange={(e) =>
            setTimeout(() => {
              setSearch(e.target.value);
              setPage(1);
            }, 1000)
          }
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
          {isLoading && (
            <Loader className="w-4 h-4 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between py-3">
        {!meta.data ? (
          <div className="h-5 w-48 bg-muted animate-pulse rounded" />
        ) : (
          <p className="text-muted-foreground ml-3">
            Showing only {meta.limit} out of {meta.totalItems}
          </p>
        )}
        <div className="flex gap-2 w-fit items-center">
          {!meta.data ? (
            <div className="h-8 w-8 bg-muted animate-pulse rounded-md" />
          ) : (
            <Button
              variant={"ghost"}
              size={"icon"}
              disabled={!meta.previousPage}
              onClick={() => setPage(page - 1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          {!meta.data ? (
            <div className="h-6 w-12 bg-muted animate-pulse rounded-md" />
          ) : (
            <p className="text-lg text-muted-foreground">
              {meta.page}/{meta.totalPages}
            </p>
          )}
          {!meta.data ? (
            <div className="h-8 w-8 bg-muted animate-pulse rounded-md" />
          ) : (
            <Button
              variant={"ghost"}
              size={"icon"}
              disabled={!meta.nextPage}
              onClick={() => setPage(page + 1)}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-2 pb-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-4 items-center border rounded-md p-4">
                <div className="w-16 h-20 bg-muted animate-pulse rounded" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ))
          : data &&
            data.data !== undefined &&
            data.data.data.map((cat: any) => (
              <div
                key={cat.id}
                className="flex gap-4 items-start p-4 border rounded-lg">
                <div className="w-48 shrink-0">
                  <img
                    loading="lazy"
                    src={cat.image || "https://placehold.co/1600x2560"}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex gap-2 items-center">
                      <h2 className="text-xl font-bold">{cat.name}</h2>

                      <Tooltip>
                        <TooltipTrigger className="h-fit w-fit">
                          <img
                            loading="lazy"
                            src={`https://flagcdn.com/w20/${cat.country_code.toLowerCase()}.png`}
                            className="w-8 h-fit rounded"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{cat.origin}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {cat.temperament}
                    </p>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="font-medium">
                        {cat.weight.metric} kg
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-muted-foreground">Life Span:</span>
                      <span className="font-medium">{cat.life_span} yr</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <StatBadge value={cat.indoor} label="Indoor" />
                    <StatBadge value={cat.natural} label="Natural" />
                    <StatBadge value={cat.rare} label="Rare" />
                    <StatBadge value={cat.rex} label="Rex" />
                    <StatBadge value={cat.hairless} label="Hairless" />
                    <StatBadge value={cat.short_legs} label="Short Legs" />
                    <StatBadge
                      value={cat.suppressed_tail}
                      label="Suppressed Tail"
                    />
                    <StatBadge value={cat.experimental} label="Experimental" />
                  </div>

                  <div className="space-y-1.5">
                    <StatBar value={cat.adaptability} label="Adaptability" />
                    <StatBar value={cat.affection_level} label="Affection" />
                    <StatBar
                      value={cat.child_friendly}
                      label="Child Friendly"
                    />
                    <StatBar value={cat.dog_friendly} label="Dog Friendly" />
                    <StatBar value={cat.energy_level} label="Energy" />
                    <StatBar value={cat.grooming} label="Grooming" />
                    <StatBar value={cat.health_issues} label="Health Issues" />
                    <StatBar value={cat.intelligence} label="Intelligence" />
                    <StatBar value={cat.shedding_level} label="Shedding" />
                    <StatBar value={cat.social_needs} label="Social Needs" />
                    <StatBar
                      value={cat.stranger_friendly}
                      label="Stranger Friendly"
                    />
                    <StatBar value={cat.vocalisation} label="Vocalisation" />
                  </div>
                </div>
                <div>
                  <a
                    href={cat.wikipedia_url}
                    target="_blank"
                    className="self-center">
                    <Button
                      variant={"outline"}
                      size="sm"
                      className="cursor-pointer">
                      Wikipedia
                    </Button>
                  </a>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-4 max-w-3xl mx-auto">Loading...</div>}>
      <CatContent />
    </Suspense>
  );
}
