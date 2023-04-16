import React from 'react'

interface ScreenProps {
    children: React.ReactNode,
    wrapperClassname?: string,
    contentClassname?: string,
    toast?: () => void
}
export const Screen = ({contentClassname, wrapperClassname, children}: ScreenProps) => {
    return (
        <div className={`screen relative flex flex-col items-center justify-center h-screen w-full p-2 bg-gradient-to-tl from-gray-100 via-gray-200 to-gray-100 ${wrapperClassname}`}>
            <div className={`relative flex flex-col items-center justify-between h-full w-11/12 max-w-md rounded-2xl p-5 bg-slate-50 overflow-y-scroll scrollbar-hide shadow-xl ${contentClassname}`}>
                {children}
                <p className="text-xs text-gray-500">© Uclass 2023 - Todos los derechos reservados</p>
            </div>
            <style jsx>{`
                .screen {
                    background: url('/doodle.jpg');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    background-blend-mode: overlay;
                    background-color: rgba(255, 255, 255, 0.5);
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    )
}
