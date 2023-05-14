
import { User } from '@/types/user';
import type { NextRequest } from 'next/server';
import {jwtVerify} from 'jose';
// either on API routes or getServerSideProps
export async function userFromToken(token: string | undefined): Promise<User | undefined> {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Missing JWT_SECRET env var. Check .env.example');
    }
    if (!token) {
        return undefined;
    }
    try {
        const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
        if (payload) {
            //Set user in request
            return payload as User;
        }
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}