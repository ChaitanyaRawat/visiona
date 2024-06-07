import SideBar from '@/components/shared/SideBar'
import React from 'react'
import MobileNav from '@/components/shared/MobileNav'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/shared/Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main >
            <Navbar />
            <div >
                <div >
                    {children}
                </div>
            </div>
            <Toaster />
        </main>
    )
}

export default Layout