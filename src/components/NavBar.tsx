import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useMemo, useCallback} from 'react'
//Icons
import {FiHome, FiUser, FiLogOut} from 'react-icons/fi'
import {GoSettings} from 'react-icons/go'
//Redux
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/userSlice'
//Constants
import {colors} from '../styles/colors'
interface iconProps {
    color: string
}
export const NavBar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const logout = useCallback(() => {
        dispatch(setUser({token: '', name: ''}))
        if (window) {
            window.localStorage.removeItem('token')
        }
    }, [])
    const items = useMemo(() => [
        {
            Icon: ({color}:iconProps) => <FiHome size={30} color={color}/>,
            label: 'Inicio',
            to: '/home'
        },

        {
            Icon: ({color}:iconProps) => <GoSettings size={30} color={color}/>,
            label: 'Ajustes',
            to: '/settings'
        },
        {
            Icon: ({color}:iconProps) => <FiUser size={30} color={color}/>,
            label: 'Perfil',
            to: '/profile'
        },
        {
            Icon: ({color}:iconProps) => <FiLogOut size={30} color={color}/>,
            label: 'Salir',
            onClick: logout
        }
    ], [])
    return (
        <>
            <div className="flex justify-between w-full px-5 py-2 bg-white shadow-md rounded-md">
                {
                    items.map((item, index) => {
                        const Icon = item.Icon;
                        const active = router.pathname === item.to;
                        return (
                            item.onClick ?
                            <button onClick={item.onClick} key={`item ${index}`}>
                                <div className="flex flex-col items-center justify-center">
                                    <div className={`rounded-xl p-2`}>
                                        <Icon color={colors.gray500}/>
                                    </div>
                                    <span className="text-md font-medium text-gray-500">{item.label}</span>
                                </div>
                            </button>
                            :
                            <Link href={item.to} key={`item ${index}`}>
                                <div className="flex flex-col items-center justify-center">
                                    <div className={`${active ? 'bg-green-500' : 'bg-transparent'} rounded-xl p-2`}>
                                        <Icon color={active ? colors.gray100 : colors.gray500}/>
                                    </div>
                                    <span className={`text-md font-medium transition-colors ${active ? 'text-green-500' : 'text-gray-500'}`}>{item.label}</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className='w-full mt-2'>
                <div className='w-full flex justify-start'>
                    <Link
                        href={router.query.previus as string || '/'}
                        className='flex items-center gap-2 bg-gray-400 text-gray-100 p-1 rounded-sm text-sm font-medium'
                    >
                        <span>Atrás</span>
                    </Link>
                

                </div>
            </div>
        </>

    )
}
