"use client"
import React, { useState, useTransition, useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants'
import { InputBuilder } from './InputBuilder'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils'
import UploadWidget from './UploadWidget'
import TransformedImage from './TransformedImage'
import { getCldImageUrl } from 'next-cloudinary'
import { addImage, updateImage } from '@/lib/actions/image.actions'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
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

    if (image) {
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
        width: image?.width,
        height: image?.height,
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
          const newImage = await addImage({
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


      if (action === 'Update') {
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
    debounce(() => {
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
      deepMergeObjects(newTransformation, transformationConfig)
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

          <div className="media-uploader-field">
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
            render={({ field }) => <Input {...field} className='input-field' />}
          />



          {type === 'fill' && (
            <InputBuilder control={form.control} name='aspectRatio' formLabel='Aspect Ratio' className='w-full' render={({ field }) => (
              <Select onValueChange={(value) => onSelectFieldHandler(value, field.onChange)} value={field.value}>
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Select Dimensions" />
                </SelectTrigger>
                <SelectContent className='font-bold'>
                  {Object.keys(aspectRatioOptions).map
                    ((key) => (<SelectItem key={key} value={key} className='select-item'>  {aspectRatioOptions[key as AspectRatioKey].label}  </SelectItem>))}
                </SelectContent>
              </Select>

            )} />
          )}


          {(type === 'remove' || type === 'recolor') && (
            <div className="prompt-field">
              <InputBuilder
                control={form.control}
                name="prompt"
                formLabel={type === 'remove' ? 'Object to remove' : 'Object to recolor'}
                className='w-full'
                render={(({ field }) => (
                  <Input
                    value={field.value}
                    className='input-field'
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
                      className='input-field'
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




          {/* <div className="media-uploader-field">
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
          </div> */}

          <div className='flex flex-col gap-4'>






            <button
              type='button'
              className='submit-button capitalize scale-transition-on-hover-110'
              disabled={isTransforming || newTransformation === null}
              onClick={onTransformHandler}
            >
              {isTransforming ? 'Transforming...' : "Magic"}

            </button>


            <button
              type='submit'
              className='submit-button capitalize scale-transition-on-hover-110'
              disabled={isSubmitting || isTransforming || image === null || transformationConfig === null}
            >
              {isSubmitting ? 'Submitting...' : "Save"}

            </button>
          </div>



        </form>
      </Form>
    </>
  )
}

export default TransformationForm
