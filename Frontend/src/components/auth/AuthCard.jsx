"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from '../ui/use-toast'
import Loader from '../common/Loader'
import { useRouter } from 'next/navigation'
import BASEURL from '@/utils/apiRoutes'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

function AuthCard({ type }) {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [posting, setPosting] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const emailValid = emailRegex.test(email);
    const passwordValid = passwordRegex.test(password);

    if (!emailValid) {
      setErrors((prev) => ({ ...prev, email: { message: 'Invalid email!' } }));
    } else {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }

    if (password.length < 8) {
      setErrors(prev => ({ ...prev, password: { message: "Password cannot be less than 8 chractors" } }))
    } else if (!passwordValid) {
      setErrors((prev) => ({ ...prev, password: { message: 'Password must contain numbers and special chracter' } }));
    } else {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }

    setIsFormValid(emailValid && passwordValid);
  }, [email, password]);

  const authWithApi = async (e, api) => {
    e.preventDefault();
    setPosting(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v${api}`, { email, password });
      localStorage.setItem('token', JSON.stringify({ value: data?.token, expiresIn: data.expiresIn }))
      toast({
        title: 'Success',
        description: data.message,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: err.response?.data.message || err.message,
        variant: 'destructive',
      });
    } finally {
      setPosting(false);
    }
  };

  if (type == 'signup' || type == 'login') {

    return (
      <form onSubmit={(e) => authWithApi(e, type === 'login' ? '/login' : '/signup')} className='flex flex-col gap-4 items-center text-center w-[400px] md:w-[500px] bg-black p-6 pt-2 custom-gradient-border rounded-xl text-white'>
        <Image className='w-[50px] h-auto' src={'/circle.png'} width={100} height={100} alt='image' />
        <div className='mb-2'>
          <h2 className='font-[700] text-[21px]'>{type === 'login' ? 'Welcome Back' : 'Create Your Account'}</h2>
        </div>


        {/* inputs */}
        <div className='w-full'>
          <Input placeholder='Email' value={email} setValue={setEmail} />
          {errors.email && <p className='text-[12px] float-left text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='w-full'>
          <Input placeholder='Password' type='password' value={password} setValue={setPassword} />
          {errors.password && <p className='text-[12px] float-left text-red-500'>{errors.password.message}</p>}
        </div>


        <Button type='submit' disabled={!isFormValid || posting} className={'w-full border-none bg-gradient-to-r from-[#05ABD4] to-[#DF8EF5] font-semibold text-[16px] bg-transparent text-black rounded-l flex items-center h-[45px]'}>
          {posting ? <Loader size='small' /> : (type === 'login' ? 'Login' : 'Sign Up')}
        </Button>
        {type === 'login' ? (
          <p className='font-semibold text-[14px] -mt-2'>Don&apos;t have an account <span><Link href='/signup' className='text-[#05ABD4]'>Sign Up</Link></span></p>
        ) : (
          <p className='font-semibold text-[14px] -mt-2'>Already have an account <span><Link href='/login' className='text-[#05ABD4]'>Login</Link></span></p>
        )}
        <div className='flex items-center text-white gap-[3px] w-full'><div className='h-[1px] bg-gray-600 w-full'></div><span className='-mt-[2px]'>or</span><div className='h-[1px] bg-gray-600 w-full'></div></div>

        <ContinueWithGoogle />
      </form>
    );

  } else {

    return (<div className='flex flex-col gap-4 items-center text-center w-[400px] md:w-[500px] bg-black  p-6 pt-2 custom-gradient-border rounded-xl text-white'>
      <Image className=' w-[50px] h-auto' src={'/circle.png'} width={100} height={100} alt='image' />

      <div className='mb-2'>
        <h2 className='font-[700] text-[21px]'>The Voice interface of Ai</h2>
        <p className='text-[13px] mt-[2px] text-gray-400 leading-4'>Create an account for free <br /> 30 minutes of conversation time</p>
      </div>

      <ContinueWithGoogle />
      <div className='flex items-center text-white gap-[3px] w-full'><div className='h-[1px] bg-gray-600 w-full'></div><span className='-mt-[2px]'>or</span><div className='h-[1px] bg-gray-600 w-full'></div></div>

      <Button onClick={()=>router.push('/signup')} className={'w-full bg-[#5958587c] border-none font-semibold text-[16px] rounded-l flex items-center h-[45px]'}>
        Sign Up
      </Button>

      <Button onClick={()=>router.push('/login')} className={'w-full border-none bg-gradient-to-r from-[#05ABD4] to-[#DF8EF5] font-semibold text-[16px] bg-transparent text-black rounded-l flex items-center h-[45px]'}>
        Login
      </Button>


    </div>)
  }
}


const Input = ({ placeholder, value, setValue }) => {
  return (
    <input placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} className='bg-[#5958587c] w-full p-[11px] pl-6 rounded-l' />
  )
}


const ContinueWithGoogle = () => {
  // const session = useSession();
  // console.log(session);
  const [googlePosting, setGooglePosting] = useState(false);

  // async function handleGoogle(){
  //   console.log("logging....")
  //   // await signIn("google")
  //   const jwt = await cookieStore.get("jwt")
  //   if(session.status == 'authenticated' && !jwt?.value){
  //     const {data} = await axios.post('/api/auth/verify', {email:session.data.user?.email ,access_token:session.data.accessToken})
  //   }
  // }

  // useEffect(()=>{
  //   handleGoogle()
  // },[session])


  function handle() {
    toast({
      title: "comming soon..."
    })
  }
  return (
    <>
      <button type='button' onClick={() => handle()} className='flex justify-center items-center w-full h-[50px] py-2 bg-[#5958585b] gap-1 rounded-md'>
        {googlePosting ? <Loader size='small' /> : (
          <>
            <Image className=' h-full w-auto' src={'/google-icon.png'} width={100} height={100} alt='google image' />
            <span className='text-[#fff] font-medium text-[14px]'>Continue with Google</span>
          </>)
        }
      </button>
      {/* <Button type='button' onClick={signOut}>Click</Button> */}
    </>
  )
}
export default AuthCard