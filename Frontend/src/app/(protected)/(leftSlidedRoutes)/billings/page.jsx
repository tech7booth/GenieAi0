import { Button } from '@/components/ui/button'
import React from 'react'

const Billing = () => {
  return (
    <div>
        <p>You are not on a plan yet. Upgrade to get more words and access premium features</p>
        <button className='mt-8 py-2 px-4 bg-gradient-to-r from-[#DF8EF5] to-[#05ABD4] rounded-md text-black font-medium hover:opacity-80 transition-all duration-500'>Upgrade Your Plan</button>
    </div>
  )
}

export default Billing