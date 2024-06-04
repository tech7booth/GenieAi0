import AuthCard from '@/components/auth/AuthCard'
import React from 'react'

function SignUp() {
  return (
    <div className='flex w-[100vw] h-[100vh] justify-center items-center bg-black'>
        <AuthCard type={'signup'}/>
    </div>
  )
}

export default SignUp