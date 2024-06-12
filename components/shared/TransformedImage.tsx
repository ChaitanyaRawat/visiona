"use client"
import React from 'react'
import Image from 'next/image'
import { getCldImageUrl, CldImage } from 'next-cloudinary'
import { dataUrl, setDelay, download, findImageDimensions } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import { TransformedImageProps } from '@/lib/definitions'


const TransformedImage = ({ image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = false }: TransformedImageProps) => {

  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), title)
  }


  return (
    <div className='flex flex-col gap-4'>
      <div className="flex justify-center">

        <h3 className='font-bold text-[30px] leading-[140%] text-white'>After</h3>


        {hasDownload && (
          <button
            className="mt-2 flex items-center gap-2 px-2 text-white scale-transition-on-hover-110"
            onClick={downloadHandler}
          >
            <Image
              src="/download.png"
              alt="Download"
              width={24}
              height={24}
              className="pb-[6px] invert"
            />
          </button>
        )}

      </div>
      {image?.publicId ? (
        <div className='relative'>
          <CldImage
            width={findImageDimensions(type, image, "width")}
            height={findImageDimensions(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes="(max-width:767px) 100vw , 50vw"
            placeholder={dataUrl as PlaceholderValue}
            className='h-fit min-h-72 w-full rounded-[10px] bg-purple-100/20 object-cover'
            onLoad={() => { setIsTransforming && setIsTransforming(false) }}
            onError={() => { setDelay(() => { setIsTransforming && setIsTransforming(false) }, 8000)() }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className='flex justify-center items-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[10px] border bg-dark-700/90'>
              <Image
                src="/loader.gif"
                width={80}
                height={80}
                alt='loader'
                className='invert'
              />
              <p className="text-white/80">Hold on...</p>
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-center items-center font-medium text-[14px] leading-[120%] h-full min-h-72 flex-col gap-5 rounded-[16px] bg-purple-100/20 shadow-inner text-white'>
          <Image
            src="/output.png"
            width={50}
            height={50}
            className='invert'
            alt='Result'
          />
        </div>
      )}
    </div>
  )
}

export default TransformedImage