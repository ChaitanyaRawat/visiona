
import React from 'react'
import Header from '@/components/shared/Header'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm'
import { auth } from '@clerk/nextjs/server'
import { findUserById } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { SearchParamProps, TransformationTypeKey } from '@/lib/definitions'

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth()
  const transformation = transformationTypes[type]
  if (!userId) redirect("/sign-in")
  const user = await findUserById(userId)
  return (
    <>
      <div className="w-10  rounded-full border-2 bg-black border-white mb-4 p-1 mx-auto">
        <Image
          src={`${transformationTypes[type].icon}`}
          alt="icon"
          width={30}
          height={30}
          className='invert'
        />
      </div>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className='mt-7'>
        <TransformationForm action='Add' userId={user._id} type={transformation.type as TransformationTypeKey} />
      </section>
    </>
  )
}

export default AddTransformationTypePage
