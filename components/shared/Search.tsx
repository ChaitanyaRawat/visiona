"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { createUrlQuery, reduceUrlQuery } from "@/lib/utils";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = createUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = reduceUrlQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);


    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  return (
    <div className="flex w-full items-center rounded-[16px]  bg-white pl-4 pr-0 shadow-sm  md:max-w-96">
      <Input
        className="border-0 bg-transparent text-dark-600 w-full placeholder:text-dark-400 h-[50px] font-medium text-[16px] leading-[140%] focus-visible:ring-offset-0 p-3 focus-visible:ring-transparent"
        placeholder="Browse Visiona"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Image
        src="/search.png"
        alt="search"
        width={60}
        height={20}
      />

    </div>
  );
};