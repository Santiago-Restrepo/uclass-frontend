import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useMemo, useCallback} from 'react'
//Icons
import {FiHome, FiUser, FiLogOut} from 'react-icons/fi'
import {GoSettings} from 'react-icons/go'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {RiDashboardFill} from 'react-icons/ri';
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/features/userSlice'
//Constants
import {colors} from '../../styles/colors'
//Types
import {User} from '@/types/user'
//Hooks
import { RootState } from '../../app/store';
import { useApi } from '@/hooks/useApi'
interface IconProps {
    color: string
}
interface NavBarProps {
    user: User
}
export const NavBar = ({
    user
}: NavBarProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {navigation} = useSelector((state: RootState) => state.navigation);
    const {authFetch} = useApi();
    const logout = useCallback(() => {
        authFetch(`/auth/logout`, {
            method: 'GET',
        });
        dispatch(setUser({token: '', name: '', id: ''}))
        router.push('/');
    }, [])
    const items = useMemo(() => {
        const allItems = [
            {
                Icon: ({color}:IconProps) => <FiHome size={20} color={color}/>,
                label: 'Inicio',
                to: '/home',
                allowedRoles: ['user', 'admin']
            },
    
            {
                Icon: ({color}:IconProps) => <GoSettings size={20} color={color}/>,
                label: 'Ajustes',
                to: '/settings',
                allowedRoles: ['user', 'admin']
            },
            {
                Icon: ({color}:IconProps) => <FiUser size={20} color={color}/>,
                label: 'Perfil',
                to: '/profile',
                allowedRoles: ['user', 'admin']
            },
            {
                Icon: ({color}: IconProps) => <RiDashboardFill size={20} color={color}/>,
                label: 'Analítica',
                to: '/dashboard',
                allowedRoles: ['user', 'admin']
            },
            {
                Icon: ({color}: IconProps) => <BsFillShieldLockFill size={20} color={color}/>,
                label: 'Admin',
                to: '/admin',
                allowedRoles: ['admin']
            },
            {
                Icon: ({color}:IconProps) => <FiLogOut size={20} color={color}/>,
                label: 'Salir',
                onClick: logout,
                allowedRoles: ['user', 'admin']
            }
        ];
        const userRoles = user.roles;
        if(!userRoles) return allItems.filter(item => item.allowedRoles.includes('user'));    
        return allItems.filter(item => item.allowedRoles.some(role => userRoles.includes(role)));
    }, [])
    return (
        <>
            <div className="flex justify-between w-full px-5 py-2 bg-white shadow-md rounded-md max-w-md">
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
                                    <span className="text-sm font-normal text-gray-500">{item.label}</span>
                                </div>
                            </button>
                            :
                            <Link href={item.to} key={`item ${index}`}>
                                <div className="flex flex-col items-center justify-center">
                                    <div className={`${active ? 'bg-green-500' : 'bg-transparent'} rounded-xl p-2`}>
                                        <Icon color={active ? colors.gray100 : colors.gray500}/>
                                    </div>
                                    <span className={`text-sm font-normal transition-colors ${active ? 'text-green-500' : 'text-gray-500'}`}>{item.label}</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className='w-full mt-2 pl-5'>
                <div className='w-full flex justify-start'>
                    {
                        navigation.map((item, index) => {
                            return (
                                <Link
                                    href={item}
                                    className='flex items-center gap-2 text-gray-400 hover:text-gray-500'
                                    key={`path ${index}`}
                                >
                                    <span>{item}</span>
                                </Link>
                            )
                        })
                    }
                

                </div>
            </div>
        </>

    )
}
