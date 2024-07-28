"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Visualizer } from 'react-sound-visualizer';
import { Mic, MoreHorizontalIcon, X } from 'lucide-react'
import Image from 'next/image'

const socketUri = 'wss://api.play.ai/v1/talk/trialbot-XpKwMXq0hu2KaMpJmJpcb';

export function TalkingScreen({ className, apiKey, phone, name, description, setTalking }) {
  const ws = useRef(null);
  const [wsStatus, setWsStatus] = useState(false)
  const [messages, setMessages] = useState([]);
  const [base64audio, setBase64audio] = useState('');
  const [playingSource, setPlayingSource] = useState('');
  

  const wsConfig = {
    type: 'setup',
    apiKey: "ak-121e5293756f4e01906c8ff5cd289df3",
    outputFormat: "mp3",
    outputSampleRate: 24000,
    inputEncoding: "media-container"
  }

  function isBase64(str) {
    try {
      const check = btoa(atob(str)) === str;
      return check
    } catch (err) {
      return false;
    }
  }


  useEffect(() => {
    ws.current = new WebSocket(socketUri); // Replace with your WebSocket URL

    ws.current.onopen = () => {
      console.log('WebSocket connected');

      ws.current.send(JSON.stringify(wsConfig));
      setWsStatus(true)
    };

    // playAudio("")
    ws.current.onmessage = async (res) => {
      const event = JSON.parse(res.data);

      if (event.type == "voiceActivityStart") {
        if (playingSource) {
          playingSource.stop();
        }
        setBase64audio('');
      }
      else if (event.type == "newAudioStream") {
        // playAudio(base64audio);
        setBase64audio('');
      }
      else if (event.type == "audioStream") {
        if (isBase64(event.data)) {
          // console.log(event.data, base64audio, 'busa bu')
          // playAudio(event.data)
          setBase64audio(prev=>prev+event.data);
        } else {
          console.error('Invalid base64 data');
        }

      }
      setMessages((prevMessages) => [...prevMessages, event.data]);
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

  // useEffect(() => {
  //   console.log(base64audio)
  // }, [base64audio])


  async function playAudio(base64Data) {
    try {
      // Deserialize event.data from a base64 string to binary
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Stop the current playing audio if any
      if (playingSource) {
        playingSource.stop();
      }

      // play audio using Web Audio Api
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);
      // console.log(audioBuffer)
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);

      setPlayingSource(source);
    } catch (err) {
      console.error("error in playing audio", err)
    }
  }


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
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  async function blobToBase64(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
    });
  }

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        autoGainControl: true,
        noiseSuppression: true,
      },
    });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        const base64Data = await blobToBase64(event.data);
        // console.log("Recorded audio data (base64):", base64Data);
        ws.current.send(JSON.stringify({ type: 'audioIn', data: base64Data }));
        console.log("send data")
      }
    };

    mediaRecorderRef.current.start(1000); // Collect data in chunks of 1 second
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <>
      <audio controls>
        <source src="data:audio/mp3;base64,

  "
          type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>


      <div className='rounded-full size-40 bg-white flex items-center justify-center'>
        {isRecording ? (
          <button onClick={stopRecording} className='bg-red-500 p-2 rounded-full'>
            Stop
          </button>
        ) : (
          <button onClick={startRecording} className='bg-green-500 p-2 rounded-full'>
            Start
          </button>
        )}
      </div>
    </>
  );
}

