import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';
//Hooks
import { useApi } from '@/hooks/useApi'
import { useEffect, useState } from 'react';
import { useNavigationPath } from '@/hooks/useNavigationPath';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { Searchers } from '@/components/searchers/Searchers';
import { Best } from '@/components/Best';
//Utils
import { userFromToken } from '@/utils/userFromToken';
//Types
import { Teacher } from '@/types/teacher';
import { Resource } from '@/types/resource';
import { User } from '@/types/user';
//Icons
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
//Props
interface HomeProps {
  user: User
}
export default function Home({
  user
}: HomeProps) {
  const { data: bestTeacherData, loading: bestTeacherLoading, error: bestTeacherError, authFetch: bestTeacherFetch } = useApi(null, `/teachers/best`);
  const { data: bestResourceData, loading: bestResourceLoading, error: bestResourceError, authFetch: bestResourceFetch } = useApi(null, `/resources/best`);
  const [bestTeachers, setBestTeachers] = useState<Teacher[]>([]);
  const [bestResources, setBestResources] = useState<Resource[]>([]);
  useNavigationPath([]);
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
        <NavBar user={user} />
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
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.token;
  const user = await userFromToken(token);
  if (!user) return { props: {} };
  return {
      props: { user }
  };
}
