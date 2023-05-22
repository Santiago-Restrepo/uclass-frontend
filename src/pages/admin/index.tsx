import Head from 'next/head'
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { PendingReviewCardList } from '@/components/admin/PendingReviewCardList';
//utils
import { userFromToken } from '@/utils/userFromToken';
//Icons
import { FaLightbulb } from 'react-icons/fa';
import { AiFillCheckSquare } from 'react-icons/ai';
import {RiDashboardFill} from 'react-icons/ri';
//Hooks
import { useApi } from '@/hooks/useApi';
//Types
import { Review } from '@/types/review';
//Props
import { User } from '@/types/user';
interface AdminProps {
    user: User
}
export default function Admin({
    user
}: AdminProps) {
    const {data: reviews, error: reviewsError, loading: reviewsLoading, authFetch: reviewsAuthFetch} = useApi<Review[]>([], `/reviews/pending`);
    function refresh(){
        reviewsAuthFetch(`/reviews/pending`, {
            method: 'GET'
        });
    }
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
            <h1 className='text-2xl font-normal text-gray-500'>Admin</h1>
            <div
                className='bg-gray-200 px-3 py-2 rounded-md mt-2'
            >
                <p className='text-yellow-600 font-normal'>
                    <FaLightbulb className='inline-block mr-2 text-yellow-600' size={20}/>
                    Bienvenido al panel de administrador <b>{user.name}</b>
                </p>
                <p className='text-gray-500 mt-5'>
                    <AiFillCheckSquare className='inline-block mr-2 text-yellow-600' size={20}/> Aquí puedes <b>aprobar</b> o <b>Rechazar</b> reseñas <br />
                    <AiFillCheckSquare className='inline-block mr-2 text-yellow-600' size={20}/> Podrás <b>eliminar</b> cuentas de usuarios <br />
                </p>
            </div>
            <div className='mt-5 border-t border-gray-200 pt-5 w-full'>
                <h1 className='text-xl text-center font-normal text-gray-400'>Reseñas pendientes</h1>
                <PendingReviewCardList reviews={reviews} refresh={refresh}/>
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

