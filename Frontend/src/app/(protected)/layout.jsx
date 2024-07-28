import LeftSlide from '@/components/common/LeftSlide'
import React from 'react'
import { UserContextProvider } from '../context/ContextProvider'

function Layout({ children }) {
    return (
        <div className='flex'>
            <UserContextProvider>
                <LeftSlide />
                <main className='w-full pl-[310px]'>
                    {children}
                </main>
            </UserContextProvider>
        </div>
    )
}

export default Layout