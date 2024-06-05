import Link from 'next/link'
import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='px-10 md:px-24'>
        <h2 className='text-[24px] font-bold my-4'>Billing</h2>
        <div className='flex justify-between w-full max-w-[340px] text-[16px] font-medium'>
            <Link href={'#'} className='pb-2 border-b-2 hover:border-b-2'>Plans</Link>
            <Link href={'#'} className='pb-2 hover:border-b-2'>Invoices</Link>
            <Link href={'#'} className='pb-2 hover:border-b-2'>Phone Numbers</Link>
        </div>

        <div className='pt-6'>{children}</div>
    </div>
  )
}

export default Layout