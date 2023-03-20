import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
//Components
import { Screen } from '@/components/Screen'
//Redux
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/userSlice'
import { useUser } from '@/hooks/useUser'
export default function Login() {
    const dispatch = useDispatch();
    const googleLogin = () =>{
        window.open('http://localhost:3000/api/auth/google', 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600')
        window.addEventListener('message', (event) => {
            const {token, name} = event.data
            if (token) {
                dispatch(setUser({token, name}))
            }
        }, false)
    }
    useUser();
    return (
        <Screen>
            <div className="topBanner w-full h-20 absolute top-0">
                <Image src='/topBanner.svg' alt="logo uclass" fill={true} style={{objectFit: "cover", overflowY: "visible", borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem",}}/>
            </div>
            <div className='z-10'>
                <Image src='/logo.svg' width={100} height={100} alt="Logo Uclass" style={{zIndex: "1"}}/>
                <h1 className='text-3xl font-bold text-gray-800'>UCLASS</h1>
            </div>
            <div className='flex flex-col w-full'>
                <input type="text" className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md' placeholder='Email'/>
                <input type="password" className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md' placeholder='Contraseña'/>
                <button className='mt-5 p-2 w-full bg-green-600 text-white font-bold rounded-md'>Iniciar sesión</button>
                <Link href='/signup' className='mt-5 p-2 w-full border-2 border-solid border-yellow-500 text-yellow-500 font-bold rounded-md text-center'>
                    Registrarse
                </Link>
            </div>
            <button onClick={googleLogin} className='flex items-center justify-center mt-5 p-2 w-fit border-2 border-gray-400 border-solid text-gray-500 font-bold rounded-md'>
                <Image src='/google.svg' width={20} height={20} alt="Logo Google" className='mr-3'/>
                Iniciar sesión con Google
            </button>            
        </Screen>
    )
}