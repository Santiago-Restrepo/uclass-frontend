import Head from 'next/head'
import { useUser } from '@/hooks/useUser'
import { useAuthFetch } from '@/hooks/useAuthFetch'
//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
import { Searchers } from '@/components/Searchers';
import { Best } from '@/components/Best';
import { useEffect, useState } from 'react';
import { config } from '@/config';
//Types
import { Teacher } from '@/types/teacher';
import { Resource } from '@/types/resource';
const { API_URL } = config;
//Icons
import {AiOutlineLoading3Quarters} from 'react-icons/ai';

export default function Home() {
    useUser();

    return (
        <>
            <Head>
            <title>Uclass</title>
            <meta name="description" content="Uclass app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Screen>
                <NavBar />
                <div className='w-full h-full py-5'>
                    Teachers
                </div>
            </Screen>
        </>
    )
}
