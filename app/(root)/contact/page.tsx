import React from 'react'
import Image from 'next/image'

const page = () => {
    return (
        <>
            <div className="min-h-[85vh] flex flex-col items-center justify-center bg-[url('/read-more-page/about1.jpg')] bg-no-repeat bg-cover text-white">
                <h2 className="text-5xl font-bold mt-4">Contact Us</h2>
                <p className='text-white mt-2'>This Website was developed by <span className='text-cyan-400 font-bold'>Chaitanya Rawat</span></p>
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 my-2">

                    <div className="mt-16 grid divide-x divide-y  divide-gray-700 overflow-hidden  rounded-3xl border text-gray-600 border-gray-700 sm:grid-cols-2 lg:grid-cols-4  lg:divide-y-0 xl:grid-cols-4">
                        <div className="group relative bg-gray-900 transition hover:z-[1] hover:shadow-2xl  hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                <Image src="/contact/gmail.png" alt='icon' loading="lazy" width="200" height="200" className="w-12 h-12 rounded-full" />
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-white transition group-hover:text-secondary">Email</h5>
                                    <p className="text-gray-300">chaitanyarawat95@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                <Image src="/contact/whatsapp.webp" alt='icon' loading="lazy" width="200" height="200" className="w-12 h-12 rounded-full" />
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-white transition group-hover:text-secondary">Whatsapp and Phone</h5>
                                    <p className="text-gray-300">+91 8586010743</p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                <Image src="/contact/linkedin.webp" alt='icon' loading="lazy" width="200" height="200" className="w-12 h-12 rounded-full" />
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-white transition group-hover:text-secondary">Linkedin</h5>
                                    <p className="text-gray-300">chaitanya-rawat-bb8b00279</p>
                                </div>
                            </div>
                        </div>
                        <div className="group relative bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                            <div className="relative space-y-8 py-12 p-8">
                                <Image src="/contact/insta.webp" alt='icon' loading="lazy" width="200" height="200" className="w-12 h-12 rounded-full" />
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-white transition group-hover:text-secondary">Instagram</h5>
                                    <p className="text-gray-300">chaitanya_rawat_senpai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page