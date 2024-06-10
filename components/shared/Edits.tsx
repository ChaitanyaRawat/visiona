"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";

import { Search } from "./Search";
import { TransformationTypeKey } from "@/lib/definitions";

export const Edits = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
  collectionHeading = "Explore collection of latest Magical edits",
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
  collectionHeading?: string
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="my-10 flex flex-col gap-5 justify-center items-center">
        <h2 className="h2-bold text-white">{collectionHeading}</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <Card image={image} key={image.publicId} />
          ))}
        </ul>
      ) : (
        <div className="flex-center h-60 w-full rounded-[10px] border border-dark-400/10 bg-white/20">
          <p className="p-20-semibold text-white">No Magic Right now</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <button
              disabled={Number(page) <= 1}
              className="button  bg-cyan-400  text-black"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </button>

            <p className="flex-center p-16-medium w-fit flex-1 text-white">
              {page} / {totalPages}
            </p>

            <button
              className="button  bg-cyan-400  text-black"
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




const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link href={`/transformations/${image._id}`} className="flex flex-1 cursor-pointer flex-col gap-5 rounded-[16px] border-2 border-cyan-400  bg-black p-4 scale-transition-on-hover">
          <p className="p-20-semibold mr-3 line-clamp-1 text-white text-center">
            {image.title}
          </p>
          <p className="p-20-semibold mr-3 line-clamp-1 text-cyan-400">Before</p>
      <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="h-40 w-full rounded-[10px] object-cover border-2 border-white"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
          <p className="p-20-semibold mr-3 line-clamp-1 text-cyan-400">After</p>

        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-[10px] object-cover border-2 border-white"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex flex-col items-center">
          <Image
            src={`${transformationTypes[
              image.transformationType as TransformationTypeKey
            ].icon
              }`}
              className="invert"
            alt={image.title}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </li>
  );
};