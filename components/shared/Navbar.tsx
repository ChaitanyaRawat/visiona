"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
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

                <SignedIn>
                    <div className="flex items-center gap-2">
                        <Link className={`font-bold text-sm px-4 py-2 leading-none rounded-full scale-transition-on-hover-110  ${pathname === "/dashboard" ? "text-blue-400" : "hover:bg-cyan-600"}`} href="/dashboard">Dashboard</Link>
                        <Link className={`font-bold text-sm px-4 py-2 leading-none rounded-full scale-transition-on-hover-110  ${pathname === "/magic" || pathname.substring(0, 16) === `/transformations` ? "text-blue-400" : "hover:bg-cyan-600"}`} href="/magic">Magic</Link>
                    </div>
                    <UserButton afterSignOutUrl='/' />
                </SignedIn>

                <SignedOut>
                    <div className='flex gap-1'>
                        <Link href={"/sign-in"} className="text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 scale-transition-on-hover-110">Login</Link>
                        <Link href={"/sign-up"} className="text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 scale-transition-on-hover-110">Sign Up</Link>
                    </div>
                </SignedOut>

            </nav>
        </>
    )
}

export default Navbar