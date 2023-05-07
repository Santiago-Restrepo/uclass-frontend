import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
//Components
import { Screen } from '@/components/layout/Screen'
//React hook form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/schemas/authSchemas'
//Services
import { signup } from '@/services/authService'
//Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema)
    });
    const onSubmit = (data: any) => {
        try {
            const {
                name,
                email,
                password,
                repeatPassword
            } = data
            toast.promise(
                signup(name, email, password, repeatPassword),
                {
                    pending: 'Registrando usuario...',
                    success: 'Usuario registrado correctamente',
                    error: {
                        render({data}){
                            const message = data instanceof Error ? data.message : "Error"
                            return message
                        }
                    }
                }
            ).then((response) => {
                router.push('/')
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
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
                <h1 className='text-2xl font-bold text-gray-800'>Registrarse</h1>
                <input 
                    type="text" 
                    className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md'
                    placeholder='Nombre'
                    {...register('name')}
                />
                {errors.name && <p className='text-red-500'>{errors.name.message?.toString()}</p>}
                <input
                    type="text"
                    className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md'
                    placeholder='email'
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
                <input 
                    type="password" 
                    className='mt-5 p-2 w-full border-2 border-gray-300 rounded-md' 
                    placeholder='Confirmar contraseña'
                    {...register('repeatPassword')}
                />
                {errors.repeatPassword && <p className='text-red-500'>{errors.repeatPassword.message?.toString()}</p>}
                <button className='mt-5 p-2 w-full bg-yellow-500 text-white font-bold rounded-md'>Registrarse</button>
                <Link href='/' className='mt-5 p-2 text-gray-500 w-full font-light text-center leading-none'>
                    O si ya tienes una cuenta, inicia sesión
                </Link>   
            </form>
            <ToastContainer />
        </Screen>
    )
}