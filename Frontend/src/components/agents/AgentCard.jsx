"use client"
import { Mic, MoreHorizontalIcon, ChevronRight, MessageCircle } from "lucide-react"
import Image from "next/image"

const AgentCard = ({ name, phone, description, setTalking, agentId }) => {
   
    return (
        <div className='bg-[#5c5b5b63] p-4 rounded-xl w-[420px] max-w-full'>
            <div className="flex justify-between items-center">
                <Image src={'/circle.png'} width={100} height={100} alt='image' className='h-[110px] w-auto mb-2' />

                <div className="flex gap-4 h-12">
                    <span onClick={()=>setTalking({active:true, agentId})} className="p-4 text-green-700 gap-1 bg-green-50 rounded-full h-full flex items-center justify-center">
                        <Mic /> <span>Talk</span>
                    </span>
                    <span className="bg-green-50 rounded-full px-4 text-green-700 h-full flex justify-center items-center">
                        <MoreHorizontalIcon />
                    </span>
                </div>
            </div>
            <b className='gradient-text font-[600] text-[21px]'>{name || "Demo Agent"}</b>

            <div className=''>
                <span className='gradient-text text-[15px] font-[600]'>{phone || "+x-xxxxx-xxxxx"}</span>
            </div>

            <p className='gradient-text font-[400] text-[14px] pr-12 mt-4'>{description || 'Add prompts, tasks, objectives, actions, custombusiness Knowledge and more to your agent. Automate your business. Stream line workflows.'}</p>

            <div className=" opacity-60 text-[14px] mt-6 flex flex-col gap-2">
                <p className="flex gap-2 items-center"><MessageCircle className="size-[18px]" /> Conversations</p>
                <p className="flex gap-2 items-center"><MessageCircle className="size-[18px]" /> Conversations</p>
                <p className="flex gap-2 items-center"><MessageCircle className="size-[18px]" /> Conversations</p>
            </div>


            <button className='mt-4 w-full rounded-full py-3 font-medium flex gap-3 justify-center items-center bg-gradient-to-r from-[#05ABD4] to-[#DF8EF5]'>
                <span className='text-black'>View Agent</span><ChevronRight className='text-black' />
            </button>
        </div>
    )
}

export default AgentCard
