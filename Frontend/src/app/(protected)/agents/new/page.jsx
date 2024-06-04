import LeftSlide from '@/components/common/LeftSlide'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import React from 'react'

const CreateAgent = () => {
    return (

        <div className='flex flex-col gap-6 w-[600px] mx-auto items-center relative'>
            <h2 className='text-[30px] font-bold mb-2 mt-8'>Create Your Agent</h2>

            <div className='flex w-full gap-4'>

                <div className='w-[250px]'>
                    <b className='text-[16px] mb-1 font-medium'>AGENT VOICE</b>
                    <button className='flex justify-center w-full items-center bg-[#151515] p-2 px-10 rounded-full'>
                        <div className='rounded-full bg-transparent size-[40px]'>
                            <Image src={'/circle.png'} width={100} height={100} alt='img' className='h-full w-auto' />
                        </div>
                        <span className=' gradient-text'>Create Agent</span>
                    </button>
                </div>

                <div className='flex-1'>
                    <b className='text-[16px] mb-1 font-medium'>WANT A CUSTOM VOICE</b>
                    <button className='flex w-full items-center bg-[#151515] p-2 px-10 rounded-full'>
                        <div className='rounded-full flex justify-center items-center bg-transparent size-[40px]'>
                            <Image src={'/icons/mic.png'} width={100} height={100} alt='img' className=' h-6 w-auto' />
                        </div>
                        <span className=' gradient-text'>Create a voice clone</span>
                    </button>
                </div>


            </div>

            <div className='w-full flex-1'>
                <b className='text-[16px] mb-1 font-medium'>AGENT</b>
                <button className='flex w-full justify-center items-center bg-[#151515] p-2 px-10 rounded-full'>
                    <div className='rounded-full flex justify-center items-center bg-transparent size-[40px]'>
                        <Image src={'/icons/add-pic.png'} width={100} height={100} alt='img' className=' h-6 w-auto' />
                    </div>
                    <span className=' gradient-text'>Upload Image</span>
                </button>
            </div>

            <div className='flex flex-col w-full'>
                <b className='text-[16px] mb-1 font-medium'>NAME</b>
                <input className='w-full rounded-md bg-[#151515] py-3 pl-4' placeholder='Give your Ai a name..' />
            </div>

            <div className='w-full flex flex-col gap-2'>
                <b className='text-[16px] font-medium mb-2'>AGENT BEHAVIOUR <span>(OPTIONAL)</span></b>
                <button className='w-full text-left bg-[#151515] p-4 rounded-xl'>
                    <b className='gradient-text text-[16px] font-[800]'>Professional usecase</b>
                    <p className='font-[400] mt-2 text-[13px] opacity-60'>Configured to be more polite, formal, staying on task, and assisting</p>
                </button>

                <button className='w-full text-left bg-[#151515] p-4 rounded-xl'>
                    <b className='gradient-text text-[16px] font-[800]'>Professional usecase</b>
                    <p className='font-[400] mt-2 text-[13px] opacity-60'>Configured to be more polite, formal, staying on task, and assisting</p>
                </button>

                <button className='w-full text-left bg-[#151515] p-4 rounded-xl'>
                    <b className='gradient-text text-[16px] font-[800]'>Professional usecase</b>
                    <p className='font-[400] mt-2 text-[13px] opacity-60'>Configured to be more polite, formal, staying on task, and assisting</p>
                </button>
            </div>

            <div className="grid w-full gap-1.5">
                <b className='text-[16px] font-[500]'>PROMPT</b>
                <p className='font-[400] text-[13px] opacity-60'>
                    Give instructions to your AI about how it should behave and interact with
                    others in conversation.
                </p>
                <Textarea className='h-[100px] bg-[#1c1c1c] text-opacity-60 border-none' placeholder="e.g. You are a customer support agent. You will try to respond to the
                    user’s questions with the best answers given your knowledge. You will
                    never make up information." id="message-2" />
                <p className="text-sm text-muted-foreground">
                    0/10000
                </p>
            </div>

            <div className="grid w-full gap-1.5">
                <b className='text-[16px] font-[500]'>GREETING MESSAGE</b>
                <p className='font-[400] text-[13px] opacity-60'>
                Your agent will say this message to start every conversation.
                </p>
                <Textarea className='bg-[#1c1c1c] placeholder-gray-100 text-opacity-60 border-none' placeholder="e.g. Hey! How may we be of assistance today?" id="message-2" />
                <p className="text-sm text-muted-foreground">
                    0/250
                </p>
            </div>

            <div className="grid w-full gap-1.5">
                <b className='text-[16px] font-[500]'>ADD CUSTOM KNOWLEDGE</b>
                <p className='font-[400] text-[13px] opacity-60'>
                Add data to give your agent precise, relevant wisdom
                </p>
                <Textarea className='h-[130px] bg-[#1c1c1c] placeholder-red-400 text-opacity-60 border-none' placeholder="i.e. The more specialized knowledge and information your agent has,
the closer to your expectations they will perform. if you’re using an
agent for Business, upload things like Business Hours, Answers to
Frequently Asked Questions, Customer Service Policies, etc" id="message-2" />
                <p className="text-sm text-muted-foreground">
                    0/250
                </p>
            </div>


            <SubmitButton />
        </div>

    )
}

function SubmitButton() {
    return (
        <div className='sticky pb-4 bg-black w-full bottom-0 '>
            <button className='w-full rounded-full py-3 flex gap-3 justify-center items-center bg-gradient-to-r from-[#05ABD4] to-[#DF8EF5]'>
                <Image src={'/icons/person_add.png'} width={100} height={100} alt='img' className=' h-6 w-auto' />
                <span className='text-black'>Create Agent</span>
            </button>
        </div>
    )
}

export default CreateAgent