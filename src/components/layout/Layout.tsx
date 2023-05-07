import { useUser } from '@/hooks/useUser'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Props
type LayoutProps = {
    children: React.ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    useUser();
    return (
        <>
            {children}
            <ToastContainer />
        </>
    )
}
