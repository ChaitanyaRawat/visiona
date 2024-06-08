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

export const Collection = ({
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
      <div className="collection-heading">
        <h2 className="h2-bold text-white">{collectionHeading}</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image) => (
            <Card image={image} key={image.publicId} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <button
              disabled={Number(page) <= 1}
              className="collection-btn"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </button>

            <p className="flex-center p-16-medium w-fit flex-1 text-white">
              {page} / {totalPages}
            </p>

            <button
              className="collection-btn"
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
      <Link href={`/transformations/${image._id}`} className="collection-card">
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
            src={`/assets/icons/${transformationTypes[
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