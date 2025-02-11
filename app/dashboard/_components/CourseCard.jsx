import Image from 'next/image'
import React from 'react'
import { HiOutlineBookOpen } from 'react-icons/hi2'
import { HiMiniEllipsisVertical } from 'react-icons/hi2';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import DropDownOption from './DropDownOption';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';


function CourseCard({ course, refreshData }) {

    const handleDelete = async () => {
        const res = await db.delete(CourseList).where(eq(CourseList.id, course?.id))
            .returning({ id: CourseList?.id })

        if (res) {
            refreshData()
        }
    }

    return (
        <div className='shadow-sm rounded-lg border p-2 cursor-pointer mt-4'>
            <Link href={'/course/'+ course?.courseId}>
                <Image src={course?.courseBanner} width={300} height={200}
                    className='w-full h-[200px] object-cover rounded-lg' />
            </Link>
            <div className='p-2'>
                <h2 className='font-medium text-lg flex justify-between items-center'>
                    {course?.courseOutput?.CourseName}
                    <DropDownOption handleDelete={() => handleDelete()}>
                        <HiMiniEllipsisVertical />
                    </DropDownOption>
                </h2>
                <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
                <div className='flex items-center justify-between'>
                    <h2 className='flex gap-2 items-center p-1 bg-blue-50 text-blue-500 text-sm rounded-sm'><HiOutlineBookOpen />{course?.courseOutput?.NoOfChapters} Chapters</h2>
                    <h2 className='text-sm p-1 bg-blue-50 text-blue-500 rounded-sm'>{course?.level}</h2>
                </div>
            </div>
        </div>
    )
}

export default CourseCard