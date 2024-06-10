import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { transformationTypes } from "@/constants";
import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { SearchParamProps } from "@/lib/definitions";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-col justify-center items-center gap-4">
        <div className="font-medium text-[14px] leading-[120%] md:font-medium text-[16px] leading-[140%] flex  gap-2">
          <p className="text-cyan-400">Magic:</p>
          <p className=" capitalize text-white gap-2 flex justify-center items-center font-bold">
            {/* <Image
              src={`${transformationTypes[image.transformationType].icon}`}
              className="invert"
              width={27}
              height={27}
              alt="logo"
            /> */}
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <div className="font-medium text-[14px] leading-[120%] md:font-medium text-[16px] leading-[140%] flex gap-2 ">
              <p className="text-cyan-400">Targeted Object:</p>
              <p className=" capitalize text-white">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <div className="font-medium text-[14px] leading-[120%] md:font-medium text-[16px] leading-[140%] flex gap-2">
              <p className="text-cyan-400">Color:</p>
              <p className=" capitalize text-white">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <div className="font-medium text-[14px] leading-[120%] md:font-medium text-[16px] leading-[140%] flex gap-2">
              <p className="text-cyan-400">Aspect Ratio:</p>
              <p className=" capitalize text-white">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-8 md:grid-cols-2">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-bold text-[30px] leading-[140%] text-white">Before</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="h-fit min-h-72 w-full rounded-[10px] bg-purple-100/20 object-cover"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId ? (
          <div className="mt-4 space-y-4 flex flex-col items-center">
            <button type="button" className="bg-cyan-500 mx-auto text-white bg-cover rounded-full py-4 px-6 font-semibold text-[16px] leading-[140%] h-[50px] w-1/2 md:h-[54px] cursor-pointer disabled:bg-cyan-700 capitalize .scale-transition-on-hover-110">
              <Link href={`/transformations/${image._id}/update`}>
                Retransform
              </Link>
            </button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mx-auto">
            <p className="text-white mx-auto">This Image was edited by <span className="font-bold text-cyan-400">{image.author.firstName}</span></p>
            <p className="text-white mx-auto">You can only <span className="font-bold">Download</span> it</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;
