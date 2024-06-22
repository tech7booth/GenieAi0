"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Visualizer } from 'react-sound-visualizer';
import { Mic, MoreHorizontalIcon, X } from 'lucide-react'
import Image from 'next/image'

const socketUri = 'wss://api.play.ai/v1/talk/My-Agent-22Qd_XpnPn1_3Q76ZNnjQ';

export function TalkingScreen({ className, apiKey, phone, name, description, setTalking }) {
  const ws = useRef(null);
  const [wsStatus, setWsStatus] = useState(false)
  const [messages, setMessages] = useState([]);

  const wsConfig = {
    type: 'setup',
    apiKey: "ak-05413439f7a642188f1f6ae0650e1731",
    outputFormat: "mp3",
    outputSampleRate: 24000,
    inputEncoding: "media-container"
  }

  useEffect(() => {
    ws.current = new WebSocket(socketUri); // Replace with your WebSocket URL

    ws.current.onopen = () => {
      console.log('WebSocket connected');

      ws.current.send(JSON.stringify(wsConfig));
      setWsStatus(true)
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message from server:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');

      setWsStatus(false);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);


  return (
    <div className={`border w-[450px] p-4 h-full bg-black border-white rounded-[20px] ${className}`}>

      <div className='relative h-12'>
        {apiKey}
        <h2>{wsStatus ? "WS Connected" : "WS Disconnected"}</h2>
        <X onClick={() => setTalking(false)} className='absolute cursor-pointer top-0 right-0 size-8' />
      </div>

      <div className='bg-[#1c1c1c] rounded-xl pb-6 px-4  w-fit'>
        <div className="flex justify-between items-center">
          <Image src={'/circle.png'} width={100} height={100} alt='image' className='h-[110px] w-auto mb-2' />

          <div className="flex gap-4 h-12">
            <span onClick={() => setTalking({ active: true, agentId })} className="p-4 text-green-700 gap-1 bg-green-50 rounded-full h-full flex items-center justify-center">
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

      </div>
      <div className='flex justify-center items-center py-4'>
        <AudioRecorder ws={ws} />
      </div>

      <div className='px-2'>
        <button className='mt-4 w-full rounded-full py-3 font-medium flex gap-3 justify-center items-center bg-red-400'>
          <span className='text-black'>End Conversation</span>
        </button>
      </div>

    </div>
  )
}

export function AudioRecorder({ ws }) {
  const [audio, setAudio] = useState('');

  async function blobToBase64(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
    });
  }

  const recordAudio = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        autoGainControl: true,
        noiseSuppression: true,
      },
    });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = async (event) => {
      const base64Data = await blobToBase64(event.data);

      console.log("hi")
      // Relevant:
      ws.current.send(JSON.stringify({ type: 'audioIn', data: base64Data }));
    };
  }
  useEffect(() => {

  }, []);

  return (
    <div className='rounded-full size-40 bg-white'>
    </div>
  )
}

