import React from "react";
import { ImageDef } from "@/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { TransformationTypeKey } from "@/lib/definitions";
import { transformationTypes } from "@/constants";
import { CldImage } from "next-cloudinary";
import { Divide } from "lucide-react";
import { Span } from "next/dist/trace";

export const Card = ({ image }: { image: ImageDef }) => {
    return (
        <li>
            <Link href={`/transformations/${image._id}`} className="flex flex-1 cursor-pointer flex-col gap-5 rounded-[16px] border-2 border-cyan-400  bg-gray-900 p-4 scale-transition-on-hover">
                <div className="relative">
                <p className="font-semibold text-[20px] leading-[140%] mr-3 line-clamp-1 text-white text-center">
                    {image.title}
                </p>
                {image.isPrivate && <span className="text-[10px] font-bold absolute right-0 top-0 p-2  text-white rounded-full border border-white">Private</span> }
                </div>
                <p className="font-semibold text-[20px] leading-[140%] mr-3 line-clamp-1 text-cyan-400">Before</p>
                <CldImage
                    src={image.publicId}
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="h-40 w-full rounded-[10px] object-cover border-2 border-white"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                />
                <p className="font-semibold text-[20px] leading-[140%] mr-3 line-clamp-1 text-cyan-400">After</p>

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
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white mx-auto">
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