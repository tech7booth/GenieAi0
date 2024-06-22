import TalkingScreen from '@/components/common/TalkingScreen'
import React from 'react'

function Page() {
  return (
    <div>
        <TalkingScreen apiKey={process.env.PLAY_AUTH_KEY}/>
    </div>
  )
}

export default Page