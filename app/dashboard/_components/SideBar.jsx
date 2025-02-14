"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { HiOutlineHome, HiOutlineSquare3Stack3D, HiOutlinePower } from "react-icons/hi2";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { SignOutButton } from '@clerk/nextjs';

function SideBar() {
    const { userCourseList } = useContext(UserCourseListContext);
    const path = usePathname();

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
        }
    ];

    return (
        <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <Image src={'/logo.png'} alt='logo' width={160} height={100} />
            <hr className='my-5' />
            <ul>
                {Menu.map((item) => (
                    <Link href={item.path} key={item.id}>
                        <div className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer rounded-lg hover:bg-gray-100 mb-3 hover:text-black ${item.path === path && 'bg-gray-100 rounded-sm text-black'}`}>
                            <div className='text-2xl mr-2'>{item.icon}</div>
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}

                <SignOutButton>
                    <button className="flex items-center gap-2 text-gray-600 p-3 cursor-pointer rounded-lg hover:bg-gray-100 mb-3 hover:text-black w-full">
                        <HiOutlinePower className='text-2xl mr-2' />
                        <h2>Logout</h2>
                    </button>
                </SignOutButton>
            </ul>

            <div className='absolute bottom-10 w-[80%]'>
                <h2 className='text-sm my-2'>{userCourseList?.length} courses created</h2>
            </div>
        </div>
    )
}

export default SideBar;
