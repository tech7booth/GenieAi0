import LeftSlide from '@/components/common/LeftSlide'
import React from 'react'

function Layout({ children }) {
    return (
        <div className='flex'>
            <LeftSlide />
            <main className='w-full pl-[310px] pt-6'>
                {children}
            </main>
        </div>
    )
}

export default Layout