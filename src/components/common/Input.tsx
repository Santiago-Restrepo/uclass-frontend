import React, {useEffect, useState} from 'react'
import { useFormContext, FieldError } from 'react-hook-form'
//Props
interface InputProps {
    label: string,
    name: string,
    type: string,
    className?: string,
}
export function Input({
    label,
    name,
    type,
    className
}: InputProps) {
    const { register } = useFormContext();
    return (
        <div className={`flex flex-col gap-2`}>
            <label className='text-gray-500 font-semibold' htmlFor={name}>{label}</label>
            <input
                className={`px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:border-green-600 ${className}`}
                type={type}
                {...register(name)}
            />
        </div>
    )
}
