import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from "react-redux";
import store from '@/app/store';
import { Layout } from '@/components/Layout';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId='67224334931-mvosn0m3r7cmurabbhftev59mhvt19dd.apps.googleusercontent.com'
    >
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </GoogleOAuthProvider>
  )
}
