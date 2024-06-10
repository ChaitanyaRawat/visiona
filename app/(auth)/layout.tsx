import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='flex-center min-h-screen w-full bg-purple-100'>
            {children}
        </main>
    )
}

export default Layout
