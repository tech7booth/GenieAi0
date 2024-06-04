import NavBar from '@/components/NavBar'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'

function Home() {
    return (
        <div className='bg-[#000000] text-white min-h-[100vh] max-w-[100vw] h-full sm:px-8 text-center sm:text-left'>
            <NavBar />

            <div className='p-4 flex flex-col-reverse sm:flex-row flex-wrap sm:justify-between items-center'>
                <div>
                    <h2 className='font-[600] text-[42px] leading-[44px] md:text-[77px] md:leading-[88px] mt-12'>
                        <span>The</span> Voice Interface <br />
                        of Ai
                    </h2>
                    <p className='font-medium text-[18px] md:text-[21px] mt-4 ml-2'>Our vision is to revolutions the way brands and <br />
                        advertisers target, reach</p>

                    <Link href={'hppl/kl'} className={buttonVariants({ variant: "outline" }) + 'border-[#FFFFFF] font-medium gap-2 bg-transparent text-white rounded-full border-2 flex items-center mt-16 h-[50px]'}>
                        <Image src='/circle.png' height={100} width={100} alt='img' className=' h-[24px] -mt-1 w-auto' /> Free Trial <ChevronRight className='size-4' />
                    </Link>

                    <div className='flex justify-center md:justify-start gap-6 mt-6'>
                        <Link href={'hppl/kl'} className={buttonVariants({ variant: "outline" }) + ' border-none bg-gradient-to-r from-[#05ABD4] to-[#DF8EF5] font-medium gap-2 bg-transparent text-black rounded-full flex items-center h-[50px]'}>
                            <Image src='/voice.png' height={100} width={100} alt='img' className=' h-[24px] w-auto' /> Create Your Voice <ChevronRight className='size-4' />
                        </Link>
                        <Link href={'hppl/kl'} className={buttonVariants({ variant: "outline" }) + 'border-[#FFFFFF] font-medium gap-2 bg-transparent text-white rounded-full border-2 flex items-center h-[50px]'}>
                            <Image src='/circle.png' height={100} width={100} alt='img' className=' h-[24px] -mt-1 w-auto' /> Create an Agent <ChevronRight className='size-4' />
                        </Link>
                    </div>

                </div>
                <div>
                    <img src={'/circle.png'} alt='img' className='h-auto w-[210px] md:w-[542px] sm:-mt-16 hover:hue-rotate-90 transition-all duration-1000' />
                </div>
            </div>
        </div>
    )
}

export default Home