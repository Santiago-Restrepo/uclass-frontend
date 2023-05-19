import Head from 'next/head'
import { GetServerSidePropsContext } from 'next';
//components
import { Screen } from '@/components/layout/Screen';
import { NavBar } from '@/components/layout/NavBar';
import { ChangePasswordForm } from '@/components/settings/ChangePasswordForm';
//utils
import { userFromToken } from '@/utils/userFromToken';
import { DeleteAccountButton } from '@/components/settings/DeleteAccountButton';
import { ReportIssueForm } from '@/components/settings/ReportIssueForm';

//Props
import { User } from '@/types/user';
interface SettingsProps {
    user: User
}
export default function Settings({
    user
}: SettingsProps) {
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
            <h1 className='text-2xl font-normal text-gray-500'>Configuración</h1>
            <ChangePasswordForm user={user}/>
            <ReportIssueForm user={user}/>
            <DeleteAccountButton user={user}/>
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

