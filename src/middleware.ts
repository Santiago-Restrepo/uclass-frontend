import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import type { User } from '@/types/user';
import {jwtVerify} from 'jose';

export async function middleware(request: NextRequest) {
    const tokenCookie = request.cookies.get('token')
    if (!tokenCookie) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Missing JWT_SECRET env var. Check .env.example');
    }
    try {
        const token = tokenCookie.value;
        const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
        if (payload) {
            //Set user in request
            const path = request.nextUrl.pathname;
            const user : User = payload as User;
            if (path.startsWith('/admin')) {
                if(user.roles && user.roles.includes('admin')){
                    return NextResponse.next();
                }else{
                    //Redirect to home
                    return NextResponse.redirect(new URL('/home', request.url))
                }
            }
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL('/', request.url))
    }
    // return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/profile', '/settings', '/admin', '/resource/:path*', '/teacher/:path*', '/subject/:path*', '/review/:path*', '/admin/:path*', '/dashboard/:path*'],
}