import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    return (
        <div>
            <h2 className='text-[30px] font-bold md:text-[36px] leading-[110%] text-cyan-400 text-center '>{title}</h2>
            {subtitle && <p className='font-normal text-[16px] leading-[140%] mt-4 text-center text-white'>{subtitle}</p>}
        </div>
    )
}

export default Header
