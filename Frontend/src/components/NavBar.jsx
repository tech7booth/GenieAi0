"use client"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"


const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' }
]

function NavBar() {
    return (
        <div className='flex justify-between py-4 items-center pt-8 max-w-[100vw] px-6 md:px-0'>
            <div className="hidden md:flex gap-16">
                <div>GenieAi</div>
                <div className="flex gap-12">
                    {
                        navLinks.map((link, i) => (
                            <Link href={link.href} key={i}>{link.name}</Link>
                        ))
                    }
                </div>
            </div>


            <Sheet className="flex md:hidden">
                <SheetTrigger className="rounded-sm border md:hidden">
                    <Menu className="size-8" />
                </SheetTrigger>
                <SheetContent side='left' className='bg-black border-[#DF8EF5] w-[310px] p-0 pt-8'>
                    <SheetHeader>
                        <SheetTitle><span className='gradient-text text-[27px]'>Genie Ai</span></SheetTitle>
                    </SheetHeader>

                    <SmNav />
                </SheetContent>
            </Sheet>
        


            <div className="flex w-fit gap-2 md:gap-10">
                <Link href={'/login'} className={buttonVariants() + ' bg-gradient-to-r from-[#05ABD4] border-none to-[#DF8EF5] font-medium text-[16px] text-black rounded-full border-2 px-6'}>Login</Link>
                <Link href={'/auth'} className={buttonVariants({ variant: "outline" }) + 'border-[#FFFFFF] font-medium text-[16px] bg-transparent text-white rounded-full border-2 px-6'}>Sign Up</Link>
            </div>
        </div>
    )
}

function SmNav() {
    return (
        <div className="w-full flex flex-col justify-between h-full">
            <div className="w-full flex flex-col gap-1 mt-8 px-2">
                {
                    navLinks.map((link, i) => (
                        <Link href={link.href} key={i} className="pl-10 rounded-sm py-2 hover:bg-gray-800 w-full">{link.name}</Link>
                    ))
                }
            </div>

            <div className="flex flex-col gap-2 mb-20 px-6">
                <Link href={'/login'} className={buttonVariants() + ' bg-gradient-to-r from-[#05ABD4] border-none to-[#DF8EF5] font-medium text-[16px] text-black rounded-full border-2 px-6'}>Login</Link>
                <Link href={'/auth'} className={buttonVariants({ variant: "outline" }) + 'border-[#FFFFFF] font-medium text-[16px] bg-transparent text-white rounded-full border-2 px-6'}>Sign Up</Link>
            </div>
        </div>
    )
}

export default NavBar