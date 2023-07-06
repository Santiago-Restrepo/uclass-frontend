import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Components
import { Screen } from '@/components/layout/Screen'
//Redux
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/userSlice'
import { useRouter } from 'next/router';
//React hook form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/authSchemas'
//Services
import { login, signInWithToken } from '@/services/authService'
import { config } from '@/config'
const { API_URL } = config;
export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        register, 
        handleSubmit, 
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const googleLogin = () =>{
        window.open(`${API_URL}/auth/google`, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=600')
        window.addEventListener('message', (event) => {
            const {token, name} = event.data
            //Set token in cookie
            if (token) {
                toast.promise(
                    signInWithToken(token),
                    {
                        pending: 'Iniciando sesión...',
                        success: 'Sesión iniciada correctamente',
                        error: {
                            render({data}){
                              // When the promise reject, data will contains the error
                                const message = data instanceof Error ? data.message : "Error"
                                return message
                            }
                        }
                    }
                ).then((response) => {
                    const {
                        token,
                        name
                    } = response.data
                    dispatch(setUser({token, name}));
                    router.push('/home')
                }).catch((error) => {
                    console.error(error)
                })
            }
        }, false)
    }
    const onSubmit = async (data: any) => {
        try {
            const {
                email,
                password
            } = data;
            toast.promise(
                login(email, password),
                {
                    pending: 'Iniciando sesión...',
                    success: 'Sesión iniciada correctamente',
                    error: {
                        render({data}){
                          // When the promise reject, data will contains the error
                            const message = data instanceof Error ? data.message : "Error"
                            return message
                        }
                    }
                }
            ).then((response) => {
                const {
                    token,
                    name
                } = response.data
                dispatch(setUser({token, name}));
                router.push('/home')
            }).catch((error) => {
                console.error(error)
            })
        } catch (error) {
            console.error(error)
        }    
    }
    return (
        <Screen>
            <div className="topBanner w-full h-20 absolute top-0">
                <Image src='/topBanner.svg' alt="logo uclass" fill={true} style={{objectFit: "cover", overflowY: "visible", borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem",}}/>
            </div>
            <div className='z-10'>
                <Image src='/logo.svg' width={100} height={100} alt="Logo Uclass" style={{zIndex: "1"}}/>
                <h1 className='text-3xl font-bold text-gray-800'>UCLASS</h1>
            </div>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col w-full'
            >
                <h1 className='text-2xl font-bold text-gray-800'>Iniciar sesión</h1>
                <input 
                    type="text" 
                    className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md' 
                    placeholder='Email'
                    {...register('email')}
                />
                {errors.email && <p className='text-red-500'>{errors.email.message?.toString()}</p>}
                <input 
                    type="password" 
                    className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md' 
                    placeholder='Contraseña'
                    {...register('password')}
                />
                {errors.password && <p className='text-red-500'>{errors.password.message?.toString()}</p>}
                <button className='mt-5 p-2 w-full bg-green-600 text-white font-bold rounded-md'>Iniciar sesión</button>
                <Link href='/signup' className='mt-5 p-2 w-full border-2 border-solid border-yellow-500 text-yellow-500 font-bold rounded-md text-center'>
                    Registrarse
                </Link>
            </form>
            <button onClick={googleLogin} className='flex items-center justify-center mt-5 p-2 w-fit border-2 border-gray-400 border-solid text-gray-500 font-bold rounded-md'>
                <Image src='/google.svg' width={20} height={20} alt="Logo Google" className='mr-3'/>
                Iniciar sesión con Google
            </button>
        </Screen>
    )
}