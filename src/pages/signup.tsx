import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
//Components
import { Screen } from '@/components/Screen'
export default function Signup() {
    return (
        <Screen>
            <div className="topBanner w-full h-20 absolute top-0">
                <Image src='/topBanner.svg' alt="logo uclass" fill={true} style={{objectFit: "cover", overflowY: "visible", borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem",}}/>
            </div>
            <Image src='/logo.svg' width={100} height={100} alt="Logo Uclass" style={{zIndex: "1"}}/>
            <h1 className='text-3xl font-bold text-gray-800'>UCLASS</h1>
            <input 
                type="text" 
                className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md'
                placeholder='Nombre'
            />
            <input 
                type="password" 
                className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md' 
                placeholder='Contraseña'
            />
            <input 
                type="password" 
                className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md' 
                placeholder='Confirmar contraseña'
            />
            <button className='mt-5 p-2 w-full bg-yellow-500 text-white font-bold rounded-md'>Registrarse</button>
            <Link href='/login' className='mt-5 p-2 text-gray-500 w-full font-light text-center leading-none'>
                O si ya tienes una cuenta, inicia sesión
            </Link>   
        </Screen>
    )
}