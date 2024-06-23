import {NextRequest,NextResponse} from 'next/server'
export { default } from "next-auth/middleware"
import {getToken} from "next-auth/jwt";

export async function middleware(req:NextRequest){
    const token = await getToken({req:req})
    const url = req.nextUrl
    if(token && (
        url.pathname === '/sign-in' ||
        url.pathname === '/sign-up' ||
        url.pathname === '/' ||
        url.pathname === '/verify'
    )){
        return NextResponse.redirect(new URL('/dashboard',req.url))
    }
    return NextResponse.redirect(new URL('/home',req.url))
}
export const config = {
    matcher:[
        '/sign-in',
        '/sign-up',
        '/',
        '/verify'
    ]
}