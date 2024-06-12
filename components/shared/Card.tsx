import React from "react";
import { ImageDef } from "@/lib/database/models/image.model";
import Link from "next/link";
import Image from "next/image";
import { TransformationTypeKey } from "@/lib/definitions";
import { transformationTypes } from "@/constants";
import { CldImage } from "next-cloudinary";
export const Card = ({ image }: { image: ImageDef }) => {
    return (
        <li>
            <Link href={`/transformations/${image._id}`} className="flex flex-1 cursor-pointer flex-col gap-5 rounded-[16px] border-2 border-cyan-400  bg-black p-4 scale-transition-on-hover">
                <p className="font-semibold text-[20px] leading-[140%] mr-3 line-clamp-1 text-white text-center">
                    {image.title}
                </p>
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