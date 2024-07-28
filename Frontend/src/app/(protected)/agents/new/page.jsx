'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AudioLines, BookAudio, BookText, ChevronDown, ChevronLeft, ChevronRight, CircleUserRound, ImageIcon, Lock, MessageSquareDot, MessageSquareWarning, ShieldBan, Smile, UserCircle2Icon, Wifi, Zap } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const CreateAgent = () => {
    const [openSlide, setOpenSlide] = useState(1);

    const [name, setName] = useState('');
    const [privacy, setPrivacy] = useState('Public');
    const [voice, setVoice] = useState('');
    const [avatar, setAvatar] = useState('');

    const [greet, setGreet] = useState('');
    const [behaviour, setBehaviour] = useState('');

    function back(){
        if(openSlide == 1){
            return setOpenSlide(1)
        }
        return setOpenSlide(prev=>prev-1)
    }

    function next(){
        if(openSlide==5){
            return setOpenSlide(5);
        }
        return setOpenSlide(prev=>prev+1)
    }
    return (
        <>
            <div className=' flex items-center p-4 fixed h-[100vh] w-full'>
                <div className='flex flex-col mr-8 gap-[4px]'>
                    <li onClick={()=>setOpenSlide(1)} className={`flex gap-2 p-4 hover:bg-gray-800 rounded-full px-8 ${openSlide==1?'bg-gray-800':''}`}>
                        <CircleUserRound className='text-[#05ABD4]' />
                        <span className='gradient-text font-bold'>Identity</span>
                    </li>
                    <li onClick={()=>setOpenSlide(2)} className={`flex gap-2 p-4 hover:bg-gray-800 rounded-full px-8  ${openSlide==2?'bg-gray-800':''}`}>
                        <Smile className='text-[#05ABD4]' />
                        <span className='gradient-text font-bold'>Behaviour</span>
                    </li>
                    <li onClick={()=>setOpenSlide(3)} className={`flex gap-2 p-4 hover:bg-gray-800 rounded-full px-8  ${openSlide==3?'bg-gray-800':''}`}>
                        <BookAudio className='text-[#05ABD4]' />
                        <span className='gradient-text font-bold'>Knowledge</span>
                    </li>
                    <li onClick={()=>setOpenSlide(4)} className={`flex gap-2 p-4 hover:bg-gray-800 rounded-full px-8 ${openSlide==4?'bg-gray-800':''}`}>
                        <Zap className='text-[#05ABD4]' />
                        <span className='gradient-text font-bold'>Actions</span>
                    </li>
                    <li onClick={()=>setOpenSlide(5)} className={`flex gap-2 p-4 hover:bg-gray-800 rounded-full px-8 ${openSlide==5?'bg-gray-800':''}`}>
                        <Wifi className='text-[#05ABD4]' />
                        <span className='gradient-text font-bold'>Deploy</span>
                    </li>
                </div>

                <div className='flex flex-col gap-4 items-center justify-between w-[40vw] h-full'>
                    <h2 className='text-[26px] font-bold'>New Agent</h2>

                    <div className='rounded-lg bg-[#1a1919] w-full h-full p-4 overflow-y-auto py-6'>

                        {openSlide==1&&<Identity name={name} setName={setName} avatar={avatar} setAvatar={setAvatar} voice={voice} setVoice={setVoice} privacy={privacy} setPrivacy={setPrivacy}/>}
                        {openSlide==2&&<Behaviour greet={greet} setGreet={setGreet} behaviour={behaviour} setBehaviour={setBehaviour} />}
                        {openSlide==3&&<Knowledge />}
                        {openSlide==4&&<Actions/>}

                    </div>

                    <div className='flex w-full gap-4'>
                        <Button onClick={back} className={`p-6 flex-1 bg-[#1a1919] h-[70px] border border-[#3b3b3b] flex justify-center items-center rounded-full ${openSlide==1?'opacity-70':''}`}>
                            <h2 className='flex items-center'><ChevronLeft className='size-[18px] text-[#05ABD4]' /> <span className='gradient-text font-bold text-[18px] '>Back</span></h2>
                        </Button>

                        <Button onClick={next} className='p-6 flex-1 bg-[#1a1919] h-[70px] border border-[#3b3b3b] flex justify-center items-center rounded-full'>
                            <h2 className='flex items-center'><span className='gradient-text font-bold text-[18px]'>
                                {openSlide == 5 ? 'Finish' : 'Next'}
                            </span><ChevronRight className='size-[18px] text-[#05ABD4]' /></h2>
                        </Button>
                    </div>
                </div>
            </div>
        </>
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

function Identity({ name, setName, privacy, setPrivacy, avatar, setAvatar, voice, setVoice }) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col w-full'>
                <b className='text-[13px] mb-1 font-medium opacity-90 flex gap-2 items-center'><UserCircle2Icon />NAME</b>
                <input type='text' name='name' value={name} onChange={e => setName(e.target.value)} className='w-full rounded-md border-[0.1px] border-[#3b3b3b] bg-[#151515] py-3 pl-4' placeholder='Give your Ai a name..' />
            </div>

            <div className='flex-1'>
                <b className='text-[13px] mb-1 font-medium opacity-90 flex items-center gap-2'> <AudioLines /> VOICE</b>

                <button className='flex justify-between w-full items-center border-[0.1px] border-[#3b3b3b] bg-[#151515] p-2 py-3 px-10 rounded-xl mb-2'>
                    <div className='flex gap-4 items-center'>
                        <div className='size-8 rounded-full border border-[#3b3b3b] '></div>
                        <span className='gradient-text'>Aliziya</span>
                    </div>
                    <ChevronDown className='text-[#05ABD4] size-[20px] justify-self-end' />
                </button>

                <button className='flex w-full items-center border-[0.1px] border-[#3b3b3b] bg-[#151515] p-2 px-10 rounded-xl'>
                    <div className='rounded-full flex justify-center items-center bg-transparent size-[40px]'>
                        <Image src={'/icons/mic.png'} width={100} height={100} alt='img' className=' h-6 w-auto' />
                    </div>
                    <span className=' gradient-text'>Create a voice clone</span>
                </button>
            </div>

            <div className='w-full flex-1'>
                <b className='text-[13px] mb-1 font-medium opacity-90 flex gap-2 items-center'> <ImageIcon /> AVATAR</b>
                <button className='flex w-full justify-center items-center bg-[#151515] p-2 px-10 rounded-xl border-[0.1px] border-[#3b3b3b]'>
                    <div className='rounded-full flex justify-center items-center bg-transparent size-[40px]'>
                        <Image src={'/icons/add-pic.png'} width={100} height={100} alt='img' className=' h-6 w-auto' />
                    </div>
                    <span className=' gradient-text'>Upload Image</span>
                </button>
            </div>

            <div className='w-full flex flex-col gap-2'>
                <b className='text-[13px] font-medium opacity-90 flex gap-2 items-center'> <Lock /> PRIVACY</b>
                <button className='w-full text-left bg-[#151515] p-4 rounded-xl border-[0.1px] border-[#3b3b3b]'>
                    <b className='gradient-text text-[14px] font-[800]'>Public</b>
                    <p className='font-[400] mt-2 text-[12px] opacity-60'>Anyone can talk to and clone this agent.</p>
                </button>

                <button className='w-full text-left bg-[#151515] p-4 rounded-xl border-[0.1px] border-[#3b3b3b]'>
                    <b className='gradient-text text-[14px] font-[800]'>Private</b>
                    <p className='font-[400] mt-2 text-[12px] opacity-60'>Only you can access this agent.</p>
                </button>

                <button className='w-full text-left bg-[#151515] p-4 rounded-xl border-[0.1px] border-[#3b3b3b]'>
                    <b className='gradient-text text-[14px] font-[800]'>Unlisted</b>
                    <p className='font-[400] mt-2 text-[12px] opacity-60'>Only people with the link can talk to this agent.</p>
                </button>
            </div>

        </div>
    )
}

function Behaviour({ greet, setGreet, behaviour, setBehaviour }) {
    return (
        <>
            <div className="grid w-full gap-1.5">
                <b className='text-[13px] font-[500] opacity-90 flex items-center gap-2'> <MessageSquareDot /> GREETING</b>
                <p className='font-[400] text-[13px] opacity-60'>
                    Your agent will say this message to start every conversation.
                </p>
                <Textarea name='Greet Message' value={greet} onChange={e => setGreet(e.target.value)} className='bg-[#1c1c1c] h-[100px] placeholder-gray-100 text-opacity-60 border border-[#3b3b3b]' placeholder="e.g. Hey! How may we be of assistance today?" id="message-2" />
                <p className="text-sm text-muted-foreground">
                    0/250
                </p>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <b className='text-[13px] font-medium mt-4 opacity-90 flex items-center gap-2'> <Smile fill='white' className='text-black' /> AGENT BEHAVIOUR <span>(OPTIONAL)</span></b>

                <button className='w-full text-left bg-[#151515] p-4 rounded-xl border border-[#3b3b3b]'>
                    <b className='gradient-text text-[14px] font-[800]'>Professional Use Case</b>
                    <p className='font-[400] mt-1 text-[12px] opacity-60'>Configured to be more polite, formal, staying on task, and assisting</p>
                </button>

                <button className='w-full text-left bg-[#151515] p-4 rounded-xl border border-[#3b3b3b]'>
                    <b className='gradient-text text-[14px] font-[800]'>Character Use Case</b>
                    <p className='font-[400] mt-1 text-[12px] opacity-60'>Configured to assume and impersonate identity.</p>
                </button>

                <button className='w-full text-left bg-[#151515] p-4 rounded-xl border border-[#3b3b3b]'>
                    <b className='gradient-text text-[16px] font-[800]'>Super Chatty</b>
                    <p className='font-[400] mt-1 text-[13px] opacity-60'>For casual laid-back conversations, like you are talking to a friend.</p>
                </button>
            </div>

        </>
    )
}

function Knowledge() {
    return (
        <>

            <div className="grid w-full gap-1.5 ">
                <b className='text-[13px] font-[500] opacity-90 flex items-center gap-2'><MessageSquareWarning /> PROMPT</b>
                <p className='font-[400] text-[13px] opacity-60'>
                    Give instructions to your AI about how it should behave and interact with
                    others in conversation.
                </p>
                <Textarea className='h-[100px] bg-[#1c1c1c] text-opacity-60 border border-[#3b3b3b]' placeholder="e.g. You are a customer support agent. You will try to respond to the
                            user’s questions with the best answers given your knowledge. You will
                            never make up information." id="message-2" />
                <p className="text-sm text-muted-foreground">
                    0/10000
                </p>
            </div>

            <div className="grid w-full gap-1.5 mt-5">
                <b className='text-[13px] font-[500] opacity-90 flex items-center gap-2'> <BookText />ADD CUSTOM KNOWLEDGE</b>
                <p className='font-[400] text-[13px] opacity-60'>
                    Add data to give your agent precise, relevant wisdom
                </p>
                <Textarea className='h-[130px] bg-[#1c1c1c] placeholder-red-400 text-opacity-60 border border-[#3b3b3b]' placeholder="i.e. The more specialized knowledge and information your agent has,
        the closer to your expectations they will perform. if you’re using an
        agent for Business, upload things like Business Hours, Answers to
        Frequently Asked Questions, Customer Service Policies, etc" id="message-2" />
                <p className="text-sm text-muted-foreground">
                    0/250
                </p>
            </div>

            <button className='flex w-full justify-center items-center mt-4 bg-[#151515] p-2 px-10 rounded-xl border-[0.1px] border-[#3b3b3b]'>
                <div className='rounded-full flex justify-center items-center bg-transparent size-[40px]'>
                    <Image src={'/icons/add-pic.png'} width={100} height={100} alt='img' className=' h-6 w-auto' />
                </div>
                <span className=' gradient-text font-bold'>Upload Knowledge Files</span>
            </button>
            <p className='font-[400] text-[13px] opacity-60 text-center'>
                Upload PDFs, FAQs, Epub, .Txt... most file types work.
            </p>

            <div>
                <b className='text-[13px] font-[500] opacity-90 flex items-center gap-2 mt-4'> <ShieldBan />GUARDRAILS</b>
                <p className='font-[400] text-[13px] opacity-60 mt-1'>
                    Force the agent to reply using only content from the knowledge base instead of general knowledge?
                </p>

                <div className='flex items-center gap-2 mt-3'>
                    <Checkbox className='border-2 size-5 border-[#3b3b3b] checked:fill-[#05ABD4]' />
                    <span className='font-[400] text-[13px] opacity-60'>Yes, only provide answers from knowledge base</span>
                </div>
            </div>
            .

        </>
    )
}

function Actions() {
    return (
        <div className='p-4'>
            <b className='text-[13px] font-[500] opacity-90 flex items-center gap-2'> <Zap className='size-6' />ACTIONS</b>
            <p className='font-[400] mt-2 text-[12px] opacity-60'>
                Select the action capabilities you’d like your agent to have access to.
            </p>

            <div className='flex items-center gap-4 mt-4'>
                <Checkbox className='border-2 size-5 border-[#3b3b3b] checked:fill-[#05ABD4]' />
                <div className='border border-[#3b3b3b] p-4 rounded-lg w-full'>
                    <b className='text-[13px] font-[500] opacity-90 flex items-center gap-1'> <Zap className='size-4 text-[#05ABD4]' />
                        <span className='gradient-text'>ACTIONS</span>
                    </b>
                    <p className='font-[400] text-[12px] opacity-60'>trial</p>
                </div>
            </div>
        </div>
    )
}

export default CreateAgent