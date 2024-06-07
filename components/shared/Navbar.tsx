"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Script from 'next/script'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
const Navbar = () => {
    const pathname = usePathname()
    return (

        <>
            <nav className="bg-gray-900 text-white py-2 px-4 flex items-center justify-between">
                <Link href={"/"}>
                    <Image src={"/logo.png"} alt='logo' height={20} width={100} className=' transition duration-300 ease-in-out transform hover:scale-110' />
                </Link>
                <SignedOut>
                    <div className='flex gap-1'>
                        {/* <Link href="/sign-in" className="bg-blue-600 text-white hover:bg-blue-500 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Login</Link> */}
                        <Link href={"/sign-in"} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 scale-transition-on-hover-110">Login</Link>
                        <Link href={"/sign-up"} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 scale-transition-on-hover-110">Sign Up</Link>


                    </div>
                </SignedOut>
                <SignedIn>
                    <div className="flex items-center gap-2">
                        <Link className={`font-bold text-sm px-4 py-2 leading-none rounded-full scale-transition-on-hover-110  ${pathname === "/dashboard" ? "text-blue-400" : "hover:bg-cyan-600"}`} href="/dashboard">Dashboard</Link>
                        <Link className={`font-bold text-sm px-4 py-2 leading-none rounded-full scale-transition-on-hover-110  ${pathname === "/magic" || pathname.substring(0, 16) === `/transformations` ? "text-blue-400" : "hover:bg-cyan-600"}`} href="/magic">Magic</Link>
                        <Link className={`font-bold text-sm px-4 py-2 leading-none rounded-full scale-transition-on-hover-110  ${pathname === "/about" ? "text-blue-400" : "hover:bg-cyan-600"}`} href="/about">About</Link>
                    </div>
                    <UserButton afterSignOutUrl='/' />
                </SignedIn>
            </nav>
        </>
    )
}

export default Navbar