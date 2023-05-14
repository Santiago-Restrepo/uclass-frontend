import axios from 'axios';
import {serialize} from 'cookie';
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
});

export default async function signinHandler(req, res) {
    if(req.method !== 'POST') return res.status(405).end(
        JSON.stringify({ message: 'Method not allowed' })
    );
    const { user } = req.body;
    const { email, password } = user;

    if(!email || !password) return res.status(400).end(
        JSON.stringify({ message: 'Email and password are required' })
    );
    //Send email and password to API
    const {data} = await api.post(`/auth/signin`, { user: { email, password } });
    if(!data) return res.status(401).end(
        JSON.stringify({ message: 'Wrong email or password' })
    );
    const {token} = data;
    if(!token) return res.status(401).end(
        JSON.stringify({ message: 'Wrong email or password' })
    );
    //Set cookie
    const serializedToken = serialize('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
    });
    res.setHeader('Set-Cookie', serializedToken);
    //Return user data
    return res.status(200).json(data);
}

// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' });
// }