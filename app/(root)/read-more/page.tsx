import React from 'react'
import Image from 'next/image'

const page = () => {
  return (

    <>

      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/read-more-page/about1.jpg')] bg-no-repeat bg-cover text-white">

        <div className="sm:flex items-center max-w-screen-xl">
          <div className="sm:w-1/2 p-10">
            <div className="image object-center text-center">
              <Image src="/logo.png" width={500} height={300} alt='image' />
            </div>
          </div>
          <div className="sm:w-1/2 p-5">
            <div className="text">

              <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About <span className="text-cyan-400">Visiona</span>
              </h2>
              <p className="text-white font-bold my-3">
                Welcome to Visiona, where the power of AI transforms your images into stunning creations. Our cutting-edge website utilizes advanced artificial intelligence algorithms to offer a range of transformative services for your visuals.
              </p>
              <p className="text-white font-bold my-3">
                With Visiona, you can effortlessly remove backgrounds, remove unwanted objects ,enhance images, automaticaly expands images, and recolor objects with just a few clicks. Whether you&apos;re a photographer looking to enhance your portfolio, a designer seeking inspiration, or simply someone who wants to unleash their creativity, Visiona provides the tools to elevate your images to the next level.
              </p>
              <p className="text-white font-bold my-3">
                Powered by state-of-the-art machine learning models, Visiona ensures precise and professional results every time. Say goodbye to tedious manual editing and hello to seamless, AI-powered transformations.
              </p>
              <p className="text-white font-bold my-3">
                Join the visionary revolution and explore the endless possibilities with Visiona today. Unlock the true potential of your images with AI at your fingertips.
              </p>
            </div>
          </div>
        </div>

      </div>



      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/read-more-page/about1.jpg')] bg-no-repeat bg-cover text-white">


        <div className="container mx-auto p-4 text-center">
          <h2 className="text-5xl font-bold mt-4">Visiona Features</h2>
          <p className="dark:text-gray-600 my-4">The following are the features of Visiona</p>

          <div className="container mx-auto py-3">


            <div className="flex flex-col overflow-hidden shadow-sm lg:flex-row rounded-xl my-2">
              <div className="max-h-80">
                <Image src="/features/fill.jpg" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-3xl font-bold">Automated Image Expansion</h3>
                <p className='text-center my-2'>AI outpainting for enlarging an image&apos;s scope</p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-xl shadow-sm lg:flex-row-reverse my-2">

              <div className="max-h-80">
                <Image src="/features/remove-bg.jpg" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-3xl font-bold p">Background Removal</h3>
                <p className='text-center my-2'>Utilizes AI to eliminate the image&apos;s background</p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden shadow-sm lg:flex-row rounded-xl my-2">

              <div className="max-h-80">
                <Image src="/features/remove.jpg" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-3xl font-bold">Erase Object</h3>
                <p className='text-center my-2'>Specify and Remove elements that are not needed in the picture</p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-xl shadow-sm lg:flex-row-reverse my-2">

              <div className="max-h-80">
                <Image src="/features/enhance.jpeg" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-3xl font-bold">Image Enhancement</h3>
                <p className='text-center my-2'>Enhances images by eliminating unwanted noise and imperfections</p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden shadow-sm lg:flex-row rounded-xl my-2">
              <div className="max-h-80">
                <Image src="/features/recolor.jpg" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-3xl font-bold">Object Recolor</h3>
                <p className='text-center my-2'>Detect and change color of objects in the image</p>
              </div>
            </div>


          </div>
        </div>

      </div>



      <div className=" min-h-screen flex flex-col items-center justify-center bg-[url('/read-more-page/about3.jpg')] bg-no-repeat bg-cover text-white">

        <div className="container mx-auto p-4 text-center">
          <h2 className="text-5xl font-bold mt-4">Purpose of this Website</h2>
          <p className="dark:text-gray-600 my-4">This website was developed by <span className='font-bold'>Chaitanya Rawat</span> for following purposes</p>


          <div className="container mx-auto py-3">

            <div className="flex flex-col overflow-hidden shadow-sm lg:flex-row rounded-xl my-2">

              <div className="max-h-80">
                <Image src="/read-more-page/nextjs-logo.png" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-2xl font-bold">To Learn Building Production-ready Full-Stack websites using Next.js</h3>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-xl shadow-sm lg:flex-row-reverse my-2">
              <div className="max-h-80">
                <Image src="/read-more-page/api-handling.jpeg" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-2xl font-bold">To Learn API Handling</h3>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden shadow-sm lg:flex-row rounded-xl my-2">
              <div className="max-h-80">
                <Image src="/read-more-page/ai-image.avif" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-2xl font-bold">To Integrate Power of AI in a website</h3>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-xl shadow-sm lg:flex-row-reverse my-2">
              <div className="max-h-80">
                <Image src="/read-more-page/data-sync.webp" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-2xl font-bold">To Learn Synchronizing data between Databases of Multiple Websites</h3>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden shadow-sm lg:flex-row rounded-xl my-2">
             
              <div className="max-h-80">
                <Image src="/read-more-page/ui-ux.webp" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-2xl font-bold">To Learn Creating Attractive and Responsive UI  </h3>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-xl shadow-sm lg:flex-row-reverse my-2">
              
              <div className="max-h-80">
                <Image src="/read-more-page/client-server.avif" layout='responsive' width={0} height={0} alt='icon' className='max-h-80 w-auto' />
              </div>
              <div className="flex flex-col justify-center flex-1 p-6 bg-gray-800">
                <h3 className="text-2xl font-bold">To Learn Building and Handling Client and Server Components</h3>
              </div>
            </div>



          </div>
        </div>

      </div>



      <div className=" min-h-screen flex flex-col items-center justify-center bg-[url('/read-more-page/about3.jpg')] bg-no-repeat bg-cover text-white">


        <div className="container mx-auto p-4 my-6 space-y-2 text-center">
          <h2 className="text-4xl font-bold">Tech Stack and Tools used</h2>
        </div>

        <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="flex flex-col items-center p-4">
            <div className='flex justify-centert items-center rounded-full p-6 bg-white overflow-hiddden'>
              <Image src={"/read-more-page/tech-stack/nextjs.jpg"} width={80} height={80} alt='tech-stack' />
            </div>
            <h3 className="my-3 text-xl font-semibold">Next.js</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className='flex justify-centert items-center rounded-full p-6 bg-white overflow-hiddden'>
              <Image src={"/read-more-page/tech-stack/react.png"} width={80} height={80} alt='tech-stack' />
            </div>
            <h3 className="my-3 text-xl font-semibold">React.js</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className='flex justify-centert items-center rounded-full p-6 bg-white overflow-hiddden'>
              <Image src={"/read-more-page/tech-stack/tailwind.webp"} width={60} height={60} alt='tech-stack' />
            </div>
            <h3 className="my-3 text-xl font-semibold">Tailwind CSS</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className='flex justify-centert items-center rounded-full p-6 bg-white overflow-hiddden'>
              <Image src={"/read-more-page/tech-stack/mongo.png"} width={80} height={80} alt='tech-stack' />
            </div>
            <h3 className="my-3 text-xl font-semibold">MongoDB</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className='flex justify-centert items-center rounded-full p-6 bg-white overflow-hiddden'>
              <Image src={"/read-more-page/tech-stack/clerk.png"} width={80} height={80} alt='tech-stack' />
            </div>
            <h3 className="my-3 text-xl font-semibold">Clerk</h3>
          </div>

          <div className="flex flex-col items-center p-4">
            <div className='flex justify-centert items-center rounded-full p-6 bg-white overflow-hiddden'>
              <Image src={"/read-more-page/tech-stack/cloudinary.avif"} width={80} height={80} alt='tech-stack' />
            </div>
            <h3 className="my-3 text-xl font-semibold">Cloudinary</h3>
          </div>


        </div>


      </div>

    </>

  )
}

export default page