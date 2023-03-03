import Head from 'next/head'
import styles from '@/styles/Home.module.css'
export default function Home() {
  const googleLogin = () =>{
    window.open('http://localhost:3000/api/auth/google', 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600')
    window.addEventListener('message', (event) => {
      console.log(event.data)
    }, false)
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <button onClick={googleLogin}>Login with Google</button>
      </main>
    </>
  )
}
