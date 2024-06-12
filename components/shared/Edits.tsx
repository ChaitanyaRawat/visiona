"use client";

import { createUrlQuery } from "@/lib/utils";
import { Search } from "./Search";
import { Card } from "./Card";
import { useSearchParams, useRouter } from "next/navigation";
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { ImageDef } from "@/lib/definitions";


export const Edits = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
  collectionHeading = "Explore collection of latest Magical edits",
}: {
  images: ImageDef[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
  collectionHeading?: string
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = createUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="my-10 flex flex-col gap-5 justify-center items-center">
        <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-white">{collectionHeading}</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <Card image={image} key={image.publicId} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-60 w-full rounded-[10px] border border-dark-400/10 bg-white/20">
          <p className="font-semibold text-[20px] leading-[140%] text-white">No Magic Right now</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <button
              disabled={Number(page) <= 1}
              className="py-4 px-6 flex justify-center items-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent bg-cyan-400  text-black"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </button>

            <p className="flex justify-center items-center font-medium text-[16px] leading-[140%] w-fit flex-1 text-white">
              {page} / {totalPages}
            </p>

            <button
              className="py-4 px-6 flex justify-center items-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent  bg-cyan-400  text-black"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};




