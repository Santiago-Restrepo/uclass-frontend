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
  const { data: bestTeacherData, loading: bestTeacherLoading, error: bestTeacherError, authFetch: bestTeacherFetch } = useAuthFetch();
  const { data: bestResourceData, loading: bestResourceLoading, error: bestResourceError, authFetch: bestResourceFetch } = useAuthFetch();
  const [bestTeachers, setBestTeachers] = useState<Teacher[]>([]);
  const [bestResources, setBestResources] = useState<Resource[]>([]);

  useUser();
  useEffect(() => {
    bestTeacherFetch(`${API_URL}/teachers/best`, {
      method: 'GET'
    })
    bestResourceFetch(`${API_URL}/resources/best`, {
      method: 'GET'
    })
  }, []);
  useEffect(() => {
    if (bestTeacherData) {
      setBestTeachers(bestTeacherData as Teacher[]);
    }
  }, [bestTeacherData]);
  useEffect(() => {
    if (bestResourceData) {
      setBestResources(bestResourceData as Resource[]);
    }
  }, [bestResourceData]);

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
          <Searchers />
          {
            bestTeacherLoading || bestResourceLoading ? <AiOutlineLoading3Quarters className="animate-spin text-5xl mx-auto" size={20}/> :
            bestTeacherError || bestResourceError ? <p>Error</p> :
            <Best teacher={bestTeachers[0]} resource={bestResources[0]} />
          }
        </div>
      </Screen>
    </>
  )
}
