import Head from 'next/head'
import { useUser } from '@/hooks/useUser'
import { useAuthFetch } from '@/hooks/useAuthFetch'
//components
import { Screen } from '@/components/Screen';
import { NavBar } from '@/components/NavBar';
export default function Home() {
  const { name, logout } = useUser();
  const { data, loading, error, authFetch} = useAuthFetch();
  if(loading){
    return <h1>Loading...</h1>
  }
  if(error){
    return <h1>Error</h1>
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
        <NavBar />
        <h1>
          Hola {name}
        </h1>
        <button onClick={logout}>
          Logout
        </button>
      </Screen>
    </>
  )
}
