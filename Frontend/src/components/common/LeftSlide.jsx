"use client"
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const LeftSlide = () => {
    const router = useRouter();
    return (
        <div className=' fixed left-0 text-[16px] flex flex-col items-center w-[310px] border-r border-gray-600 justify-between h-[100vh]'>

            <div className='flex flex-col items-center w-full'>
                <Image src={'/circle.png'} width={100} height={100} alt='img' className='h-[100px] w-auto' />
                <button onClick={()=>router.push('/agents/new')} className='mt-6 flex justify-center items-center bg-gray-900 p-3 px-10 rounded-full'>
                    <Plus className='mr-4' />
                    <span>Create Agent</span>
                </button>

                <div className='flex flex-col w-full mt-4 px-1'>

                    <Link href={'/agents'} className='flex items-center gap-4 py-3 w-full pl-14 rounded-md hover:bg-slate-800'>
                        <Image src={'/icons/user-acts.png'} width={100} height={100} alt='img' className='h-[27px] w-auto' />
                        <span>My agents</span>
                    </Link>

                    <Link href={'#'} className='flex items-center gap-4 py-3 w-full pl-14 rounded-md hover:bg-slate-800'>
                        <Image src={'/icons/sms.png'} width={100} height={100} alt='img' className='h-[27px] w-auto' />
                        <span>Conversations</span>
                    </Link>

                    <Link href={'#'} className='flex items-center gap-4 py-3 w-full pl-14 rounded-md hover:bg-slate-800'>
                        <Image src={'/icons/trip.png'} width={100} height={100} alt='img' className='h-[27px] w-auto' />
                        <span>For Business</span>
                    </Link>

                    <Link href={'/billings'} className='flex items-center gap-4 py-3 w-full pl-14 rounded-md hover:bg-slate-800'>
                        <Image src={'/icons/code_off.png'} width={100} height={100} alt='img' className='h-[27px] w-auto' />
                        <span>Billing</span>
                    </Link>

                    <Link href={'#'} className='flex items-center gap-4 py-3 w-full pl-14 rounded-md hover:bg-slate-800'>
                        <Image src={'/icons/bolt.png'} width={100} height={100} alt='img' className='h-[27px] w-auto' />
                        <span>Actions</span>
                    </Link>
                </div>
            </div>

            <div className='py-2'>
                <button className='flex justify-center items-center bg-gray-900 p-3 px-10 rounded-full'>
                    <Image src={'/icons/acute.png'} width={100} height={100} alt='Image' className='w-[25px] h-auto mr-2'/>
                    <span>30 min left</span>
                </button>
                <button className='mt-2 flex justify-center items-center bg-gray-900 p-3 px-6 mx-auto rounded-full bg-gradient-to-r to-[#05abd421] from-[#df8ef51e]'>
                    <span className='gradient-text'>Upgrade Your plan</span>
                </button>
                
                <div className='flex items-center justify-center py-2 mt-2'>
                    <div className='bg-white size-[45px] rounded-full mr-4'></div>
                    <div className='text-[14px] leading-4'>
                        <b>Rohit Raj</b>
                        <p>rohit@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSlide