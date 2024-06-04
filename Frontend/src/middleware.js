import {
    cookies
} from 'next/headers';
import {
    NextResponse
} from 'next/server'
import {
    ApiError
} from './utils/api.utils';
import axios from 'axios';


const unAuthRoutes = ['/auth','/login', '/signup'];
const authRoutes = ['/agents/new', '/agents'];
export async function middleware(req) {
    try {
        const requestedPath = req.nextUrl.pathname;
        const data = await decodeToken(req);

        console.log(data);
        if (!data.status) {
            if (authRoutes.includes(requestedPath)) {
                return NextResponse.redirect('http://localhost:3000/login');
            }else{
                return NextResponse.next();
            }
        }else{
            if(unAuthRoutes.includes(requestedPath)){
                return NextResponse.redirect('http://localhost:3000/');
            }
        }

        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('userId', data?.userId);
        requestHeaders.set('role', data?.role || "User");

        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })

        return response

    } catch (error) {
        console.error('error in middleware', error.message)
        return NextResponse.json(new ApiError(null, error.message, error.message), {
            status: 500
        })
    }
}

const decodeToken = async (req) => {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt');
    
    if (!token) {
        return {
            status: false,
            data: null,
            message: "Token is missing."
        }
    }

    try {
        const {data} = await axios.post('http://localhost:3000/api/auth/verify-token', {token:token.value});
        return {
            data: data,
            status: true,
            message: "Token verified."
        };
    } catch (err) {
        console.log(err.message);
        return {
            data: null,
            status: false,
            message: "Invalid token!"
        };
    }
}

export const config = {
    matcher: '/:path*',
    // matcher: ['/','/login','/signup','/home','/api/:path*'],
}