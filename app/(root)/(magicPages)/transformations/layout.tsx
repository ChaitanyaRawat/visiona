
import React from 'react'


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main >
            <div className='p-3 md:p-40 bg-black'>
                {children}
            </div>
        </main>
    )
}

export default Layout