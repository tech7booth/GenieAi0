import {
    cookies
} from 'next/headers';
import {
    NextResponse
} from 'next/server';

const unAuthRoutes = ['/auth', '/login', '/signup'];
const authRoutes = ['/agents/new', '/agents'];
export async function middleware(req) {
    try {
        const requestedPath = req.nextUrl.pathname;
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        // const jwtExpiresAt = cookieStore.get('jwtExpiresAt').value;

        if ((!token) && authRoutes.includes(requestedPath)) {
            return NextResponse.redirect(`${process.env.BASE_Url || 'https://genie-ai0.vercel.app'}/login`);

        } else if (token && unAuthRoutes.includes(requestedPath)) {
            return NextResponse.redirect(process.env.BASE_Url || 'https://genie-ai0.vercel.app/');

        }

        return NextResponse.next();
    } catch (error) {
        console.error('error in middleware', error.message)
    }
}




export const config = {
    matcher: '/:path*'
}