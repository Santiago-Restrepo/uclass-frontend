import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from '@/components/layout/Loading';
//Props
type LayoutProps = {
    children: React.ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    // useUser();
    return (
        <>
            <Loading />
            {children}
            <ToastContainer />
        </>
    )
}
