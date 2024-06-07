import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    return (
        <div>
            <h2 className='h2-bold text-cyan-400 text-center '>{title}</h2>
            {subtitle && <p className='p-16-regular mt-4 text-center text-white'>{subtitle}</p>}
        </div>
    )
}

export default Header
