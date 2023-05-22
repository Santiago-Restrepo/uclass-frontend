import Head from 'next/head'
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
//utils
import { userFromToken } from '@/utils/userFromToken';
//Icons
import {RiDashboardFill} from 'react-icons/ri';
//Props
import { User } from '@/types/user';
interface DashboardProps {
    user: User
}
export default function Dashboard({
    user
}: DashboardProps) {
    
    return (
        <>
        <Head>
            <title>Uclass</title>
            <meta name="description" content="Uclass app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Screen>
            <NavBar user={user}/>
            <div>
                <h1 className='text-xl text-center font-normal text-gray-500'>Dashboards</h1>
                <div className='flex flex-wrap justify-center gap-5 mt-2 w-full'>
                    <p className='text-center text-gray-400 w-full leading-none'>
                        El siguiente apartado es para acceder a los dashboards de profesores y recursos. Contiene información técnica por lo que puede ser complicado de entender.
                    </p>
                    <div className='flex items-center w-full gap-2'>
                        <Link 
                            className='group text-center text-green-600 border-2 font-medium border-green-600 px-3 py-2 rounded-md leading-none transition-colors hover:bg-green-600 hover:text-white'
                            href='/dashboard/teachers'
                        >
                            <RiDashboardFill className='inline-block mr-2 text-green-600 group-hover:text-white' size={20}/> Dashboard de profesores y reseñas
                        </Link>
                        <Link 
                            className='group text-center text-blue-600 border-2 font-medium border-blue-600 px-3 py-2 rounded-md leading-none transition-colors hover:bg-blue-600 hover:text-white'
                            href='/dashboard/subjects'
                        >
                            <RiDashboardFill className='inline-block mr-2 text-blue-600 group-hover:text-white' size={20}/> Dashboard de asignaturas y recursos
                        </Link>
                    </div>
                </div>
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

