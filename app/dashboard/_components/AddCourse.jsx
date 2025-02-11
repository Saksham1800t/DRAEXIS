"use client"
import React, { useContext } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function AddCourse() {

    const { user } = useUser();

    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-3xl'>
                    YO! 🤘,<span className='font-bold'> {user?.fullName}</span>
                </h2>
                <p className='text-sm text-gray-500'>Create a new Course with AI 🤖, share with Friends and Earn 💰 from it. </p>
            </div>
            <Link href={'/create-course'}>
                <Button>+ Create AI Course</Button>
            </Link>
        </div>
    )
}

export default AddCourse