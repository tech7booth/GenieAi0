import AuthCard from '@/components/auth/AuthCard'

function Login() {
  return (
    <div className='flex w-[100vw] h-[100vh] justify-center items-center bg-black'>
        <AuthCard type={'login'}/>
    </div>
  )
}

export default Login