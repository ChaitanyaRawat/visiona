"use client"
import React, { useState, useTransition, useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants'
import { InputBuilder } from './InputBuilder'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AspectRatioKey, setDelay, integrateObjects } from '@/lib/utils'
import UploadWidget from './UploadWidget'
import TransformedImage from './TransformedImage'
import { getCldImageUrl } from 'next-cloudinary'
import { createImage, updateImage } from '@/lib/actions/image.actions'
import { useRouter } from 'next/navigation'

import { Switch } from '../ui/switch'
import { TransformationFormProps, Transformations } from '@/lib/definitions'


export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
  isPrivate: z.boolean(),
})



const TransformationForm = ({ action, data = null, userId, type, config = null }: TransformationFormProps) => {


  const transformationType = transformationTypes[type]
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()


  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId,
    isPrivate: data?.isPrivate,
  } : defaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  })




  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values)
    setIsSubmitting(true)

    if (image && image.width && image.height) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig
      })

      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image.width,
        height: image.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
        isPrivate: values?.isPrivate
      }
      console.log("Image data = ", imageData)

      if (action === 'Add') {
        try {
          const newImage = await createImage({
            image: imageData,
            userId,
            path: '/'
          })

          if (newImage) {
            form.reset()
            setImage(data)
            router.push(`/transformations/${newImage._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }


      if (action === 'Update' && data) {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data._id,

            },
            userId,
            path: `/transformations/${data._id}`
          })

          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    setIsSubmitting(false)
  }



  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]
    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height
    }))
    setNewTransformation(transformationType.config)
    return onChangeField(value)
  }

  const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
    setDelay(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']:
            value
        }
      }))
    }, 1000)()
    return onChangeField(value)
  }



  const onTransformHandler = async () => {
    setIsTransforming(true)
    setTransformationConfig(
      integrateObjects(newTransformation, transformationConfig)
    )
    setNewTransformation(null)

  }


  useEffect(() => {
    if (image && (type === 'restore' || type === 'removeBackground')) {
      setNewTransformation(transformationType.config)
    }
  }, [image, transformationType.config, type])



  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <div className=" grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
            <InputBuilder
              control={form.control}
              name='publicId'
              className='flex size-full flex-col'
              render={({ field }) => (
                <UploadWidget
                  onValueChange={field.onChange}
                  setImage={setImage}
                  publicId={field.value}
                  image={image}
                  type={type}
                />
              )}
            />
            <TransformedImage
              image={image}
              type={type}
              title={form.getValues().title}
              isTransforming={isTransforming}
              setIsTransforming={setIsTransforming}
              transformationConfig={transformationConfig}
            />
          </div>
          <InputBuilder
            control={form.control}
            name='title'
            formLabel='Image Name'
            className='w-full text-white'
            render={({ field }) => <Input {...field} className='rounded-[16px] bg-white border-2 border-purple-200/20 shadow-sm shadow-purple-200/15  text-black disabled:opacity-100 font-semibold text-[16px] leading-[140%] h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent !important' />}
          />



          {type === 'fill' && (
            <InputBuilder control={form.control} name='aspectRatio' formLabel='Aspect Ratio' className='w-full' render={({ field }) => (
              <Select onValueChange={(value) => onSelectFieldHandler(value, field.onChange)} value={field.value}>
                <SelectTrigger className="w-full border-2 border-purple-200/20 shadow-sm shadow-purple-200/15 rounded-[16px] h-[50px] md:h-[54px] text-dark-600 font-semibold text-[16px] leading-[140%] disabled:opacity-100 placeholder:text-dark-400/50 px-4 py-3 focus:ring-offset-0 focus-visible:ring-transparent focus:ring-transparent focus-visible:ring-0 focus-visible:outline-none !important">
                  <SelectValue placeholder="Select Dimensions" />
                </SelectTrigger>
                <SelectContent className='font-bold'>
                  {Object.keys(aspectRatioOptions).map
                    ((key) => (<SelectItem key={key} value={key} className='py-3 cursor-pointer hover:bg-purple-100'>  {aspectRatioOptions[key as AspectRatioKey].label}  </SelectItem>))}
                </SelectContent>
              </Select>

            )} />
          )}


          {(type === 'remove' || type === 'recolor') && (
            <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
              <InputBuilder
                control={form.control}
                name="prompt"
                formLabel={type === 'remove' ? 'Object to remove' : 'Object to recolor'}
                className='w-full'
                render={(({ field }) => (
                  <Input
                    value={field.value}
                    className='rounded-[16px] bg-white border-2 border-purple-200/20 shadow-sm shadow-purple-200/15  text-black disabled:opacity-100 font-semibold text-[16px] leading-[140%] h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent !important'
                    onChange={(e) => onInputChangeHandler("prompt", e.target.value, type, field.onChange)}
                  />
                ))}
              />

              {(type === 'recolor') && (
                <InputBuilder
                  control={form.control}
                  name="color"
                  formLabel='Replacement Color'
                  className='w-full'
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      className='rounded-[16px] bg-white border-2 border-purple-200/20 shadow-sm shadow-purple-200/15  text-black disabled:opacity-100 font-semibold text-[16px] leading-[140%] h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent !important'
                      onChange={(e) => onInputChangeHandler("color", e.target.value, 'recolor', field.onChange)}
                    />
                  )}
                />
              )}
            </div>
          )}


          <div className='mx-auto flex justify-center items-center gap-2 bg-gray-600 w-[210px] rounded-full p-1'>

            <p className='text-white font-bold'>Private Image</p>
            <InputBuilder
              control={form.control}
              name="isPrivate"
              formLabel=''
              render={({ field }) => (

                <Switch
                  value={field.value}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />

              )}
            />
          </div>


          <div className='flex flex-col items-center'>

            <button
              className=" my-1 w-[140px] cursor-pointer inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-xl border-2 border-cyan-400 hover:bg-cyan-500 scale-transition-on-hover-110"
              disabled={isTransforming || newTransformation === null}
              onClick={onTransformHandler}>
              <span className=" px-5 py-2.5 bg-opacity-0 font-bold">
                {isTransforming ? 'Transforming...' : "Magic"}
              </span>
            </button>
            <button
              type='submit'
              className="my-1 w-[140px] cursor-pointer inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-xl border-2 border-cyan-400 hover:bg-cyan-500 scale-transition-on-hover-110"
              disabled={isSubmitting || isTransforming || image === null || transformationConfig === null}
            >
              <span className=" px-5 py-2.5 bg-opacity-0 font-bold">
                {isSubmitting ? 'Saving...' : "Save"}
              </span>
            </button>

          </div>

        </form>
      </Form>
    </>
  )
}

export default TransformationForm
