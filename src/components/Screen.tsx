import React from 'react'
interface ScreenProps {
    children: React.ReactNode,
    wrapperClassname?: string,
    contentClassname?: string
}
export const Screen = ({contentClassname, wrapperClassname, children}: ScreenProps) => {
    return (
        <div className={`flex flex-col items-center justify-center h-screen w-full p-5 bg-gradient-to-tl from-green-300 via-green-400 to-green-300 ${wrapperClassname}`}>
            <div className={`flex flex-col items-center justify-center h-full w-full max-w-md rounded-xl p-5 bg-slate-50 relative ${contentClassname}`}>
                {children}
            </div>
        </div>
    )
}
