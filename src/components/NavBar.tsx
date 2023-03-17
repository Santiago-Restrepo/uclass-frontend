import React from 'react'
import {FiHome, FiUser, FiLogOut} from 'react-icons/fi'
import {GoSettings} from 'react-icons/go'
export const NavBar = () => {
    return (
        <div className="flex flex-col w-1/6 h-screen bg-white shadow-sm">
            <div className="flex flex-col items-center justify-center h-1/6">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                    <FiUser size={30} color="white"/>
                </div>
                <span className="mt-2 text-lg font-bold text-gray-800">Nombre</span>
            </div>
            <div className="flex flex-col items-center justify-center h-5/6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                    <FiHome size={20} color="white"/>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                    <GoSettings size={20} color="white"/>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                    <FiLogOut size={20} color="white"/>
                </div>
            </div>
        </div>

    )
}
