"use client"

import React from 'react'
import { transformationTypes } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
const page = () => {
  return (


    <section className="text-gray-400 body-font bg-black">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Magical Transformations</h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-opacity-80">Choose Your Magic</p>
        </div>
        <div className="flex flex-wrap -m-4">


          {Object.values(transformationTypes).map((curr) => {
            return (
              <div key={curr.type} className="xl:w-1/3 md:w-1/2 p-4">
                <Link href={`/transformations/add/${curr.type}`}>
                  <div className="border-2 border-cyan-500 border-opacity-75 p-6 rounded-lg bg-gray-900  text-white hover:bg-cyan-300 hover:text-black scale-transition-on-hover">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full border-2 bg-black border-white mb-4 p-1">
                      <Image
                        src={`${curr.icon}`}
                        alt="icon"
                        width={24}
                        height={24}
                        className='invert'
                      />
                    </div>
                    <h2 className="text-lg font-medium title-font mb-2">{curr.title}</h2>
                    <p className="leading-relaxed">{curr.subTitle}.</p>
                  </div>
                </Link>
              </div>
            )
          })}

        </div>
      </div>
    </section>

  )
}

export default page
