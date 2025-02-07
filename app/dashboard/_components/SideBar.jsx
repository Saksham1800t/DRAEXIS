"use client"
import React from 'react'
import Image from 'next/image'
import { HiOutlineHome, HiOutlineSquare3Stack3D, HiOutlineShieldCheck, HiOutlinePower } from "react-icons/hi2";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"

function SideBar() {
    const Menu = [
        {
            id: 1,
            name: 'Home',
            icon: <HiOutlineHome />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Explore',
            icon: <HiOutlineSquare3Stack3D />,
            path: '/dashboard/explore'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: <HiOutlineShieldCheck />,
            path: '/dashboard/upgrade'
        },
        {
            id: 4,
            name: 'Logout',
            icon: <HiOutlinePower />,
            path: '/dashboar/logout'
        },
    ]

    const path = usePathname();

    return (
        <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <Image src={'/logo.png'} alt='logo' width={160} height={100} />
            <hr className='my-5' />
            <ul>
                {Menu.map((item) => (
                    <Link href={item.path} key={item.id}>
                        <div className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer rounded-lg hover:bg-gray-100 mb-3 hover:text-black ${item.path == path && 'bg-gray-100 rounded-sm text-black'}`}>
                            <div className='text-2xl mr-2'>{item.icon}</div>
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </ul>

            <div className='absolute bottom-10 w-[80%]'>
                <Progress value={33} />
                <h2 className='text-sm my-2'>3 out of 5 course created</h2>
                <h2 className='text-xs text-gray-500'>upgrade your plan for unlimited course genrator</h2>
            </div>

        </div>
    )
}

export default SideBar