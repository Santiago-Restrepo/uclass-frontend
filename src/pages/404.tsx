import React from 'react'
import Head from 'next/head'
//hooks
import { useRouter } from 'next/router';
//components
import { Screen } from '@/components/layout/Screen';
//Icons
import {BiMessageAltError} from 'react-icons/bi';
export default function Custom404() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Uclass</title>
                <meta name="description" content="Uclass app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Screen>
                
                <div className='w-full h-full py-5'>
                    <div className='flex flex-col items-center justify-center h-full'>
                        <BiMessageAltError className='text-red-500' size={100}/>
                        <h1 className='text-2xl font-bold text-red-500'>404</h1>
                        <p className='text-gray-500'>Página no encontrada</p>
                        <button className='px-3 py-2 mt-5 text-white font-medium bg-green-600 rounded-md' onClick={() => router.push('/home')}>Volver al inicio</button>
                    </div>
                </div>
            </Screen>
    </>
    )
}
