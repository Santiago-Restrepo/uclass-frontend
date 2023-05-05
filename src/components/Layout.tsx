import { useNavigationPath } from '@/hooks/useNavigationPath'
import { useUser } from '@/hooks/useUser'
import React from 'react'
//Props
type LayoutProps = {
    children: React.ReactNode
}

export const Layout = ({children}: LayoutProps) => {
    useUser();
    useNavigationPath();
    return (
        <>
            {children}
        </>
    )
}
