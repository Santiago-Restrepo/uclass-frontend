import React from 'react'
interface ScreenProps {
    children: React.ReactNode,
    wrapperClassname?: string,
    contentClassname?: string
}
export const Screen = ({contentClassname, wrapperClassname, children}: ScreenProps) => {
    return (
        <div className={`flex flex-col items-center justify-center h-screen w-full p-5 bg-gradient-to-tl from-green-500 via-green-400 to-green-700 ${wrapperClassname}`}>
            <div className={`flex flex-col items-center justify-between h-full w-full max-w-md rounded-2xl p-5 bg-slate-50 relative ${contentClassname}`}>
                {children}
                <p className="text-xs text-gray-500">© Uclass 2023 - Todos los derechos reservados</p>
            </div>
        </div>
    )
}
