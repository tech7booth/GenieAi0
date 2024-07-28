"use client"
import AgentCard from '@/components/agents/AgentCard'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import {TalkingScreen} from '@/components/common/TalkingScreen'

const Agents = () => {
    const [talking, setTalking] = useState('');
    return (
        <div className='md:px-24 mt-6'>
            <h2 className='text-[24px] font-bold flex items-center gap-4 pl-2 my-4'>My Agents <span className='gradient-text text-[14px] ml-1 mt-1'>+ Create new agent</span></h2>
            <div className='flex flex-wrap gap-4 p-2 justify-between'>
                <AgentCard setTalking={setTalking} />
                <CreateAgentCard />
            </div>
            {talking && (
                <div className='h-full w-full p-4 fixed top-0 left-0 bg-black bg-opacity-50'>
                    <TalkingScreen className=' float-right' setTalking={setTalking}/>
                </div>
            )}
        </div>
    )
}

const CreateAgentCard = () => {
    return (
        <div className='bg-[#5c5b5b63] p-4 rounded-xl w-[420px] max-w-full'>
            <Image src={'/circle.png'} width={100} height={100} alt='image' className='h-[110px] w-auto mb-2' />
            <b className='gradient-text font-[600] text-[21px]'>Create New Agent</b>

            <div className=''>
                <span className='gradient-text text-[15px] font-[600]'>+91-91228-74046</span>
            </div>

            <p className='gradient-text font-[400] text-[14px] pr-12 mt-4'>Add prompts, tasks, objectives, actions, custom
                business Knowledge and more to your agent.
                Automate your business. Stream line workflows.</p>

            <button className='mt-4 w-full rounded-full py-3 font-medium flex gap-3 justify-center items-center bg-gradient-to-r from-[#05ABD4] to-[#DF8EF5]'>
                <span className='text-black'>Create Agent</span><ChevronRight className='text-black' />
            </button>
        </div>
    )
}

export default Agents