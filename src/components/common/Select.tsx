import React from 'react'
import { useFormContext } from 'react-hook-form'
//props
interface SelectProps {
    label: string,
    name: string,
    options: any[],
    defaultValue?: string
}
export function Select({
    label,
    name,
    options,
    defaultValue = ''
}: SelectProps) {
    const { register, formState:{errors} } = useFormContext();
    return (
        <div className='flex flex-col gap-2 mb-2'>
            <label className='text-gray-500 font-semibold' htmlFor={name}>{label}{options.length === 0 && " (Un administrador las creará pronto)"}</label>
            <select
                className='px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:border-green-600'
                defaultValue={defaultValue}
                {...register(name)}
                disabled={options.length === 0}
            >
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
                {
                    options.length === 0 && (
                        <option value=''>No hay opciones aún</option>
                    )
                }
            </select>
        </div>
    )
}
