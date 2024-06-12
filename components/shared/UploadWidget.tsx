"use client"

import React from 'react'
import { useToast } from '../ui/use-toast'
import { CldImage, CldUploadWidget } from "next-cloudinary"
import Image from 'next/image';
import { findImageDimensions } from '@/lib/utils';
import { dataUrl } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';


type UploadWidgetProps = {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: any;
    type: string;
}

const UploadWidget = ({ onValueChange, setImage, image, publicId, type }: UploadWidgetProps) => {
    const { toast } = useToast()
    const onUploadSuccessHandler = (result: any) => {
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url
        }))
        onValueChange(result?.info?.public_id)
        toast({
            title: "Image uploaded successfully",
            duration: 5000,
            className: "bg-green-400 text-white font-bold"
        })
    }
    const onUploadErrorHandler = () => {
        toast({
            title: "Somethng went wrong while uploading",
            description: "please try again",
            duration: 5000,
            className: "bg-red-500 text-white font-bold"
        })
    }


    return (
        <CldUploadWidget
            uploadPreset='chaitanya_visiona'
            options={{
                multiple: false,
                resourceType: "image"
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({ open }) => (
                <div className='flex flex-col gap-4'>
                    <h3 className='font-bold text-[30px] leading-[140%] text-white text-center'>Before</h3>
                    {publicId ? (
                        <div>
                            <div className="cursor-pointer overflow-hidden rounded-[10px]">
                                <CldImage
                                    width={findImageDimensions(type, image, "width")}
                                    height={findImageDimensions(type, image, "height")}
                                    src={publicId}
                                    alt='image'
                                    sizes="(max-width:767px) 100vw , 50vw"
                                    placeholder={dataUrl as PlaceholderValue}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center h-72 cursor-pointer flex-col gap-5 rounded-[16px]  bg-purple-100/20 shadow-inner text-white' onClick={() => open()}>
                            <div className="rounded-[16px] bg-white  p-5 shadow-sm shadow-purple-200/50 scale-transition-on-hover-110 hover:bg-cyan-400">
                                <Image
                                    src="/upload.png"
                                    alt="Add Image"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <p className='font-medium text-[14px] leading-[120%]'>Click Here to upload Image</p>
                        </div>
                    )}
                </div>
            )}


        </CldUploadWidget>
    )
}

export default UploadWidget