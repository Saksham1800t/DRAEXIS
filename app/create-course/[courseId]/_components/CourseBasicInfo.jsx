import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function CourseBasicInfo({ course }) {
    return (
        <div className='p-10 border rounded-xl shadow-sm mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <h2 className='font-bold text-2xl'>{course?.courseOutput?.CourseName}</h2>
                    <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.Description}</p>
                    <h2 className='font-medium mt-2 flex gap-2 items-center text-blue-500'>Category: {course?.courseOutput?.Category}</h2>
                    <Button className='mt-5 w-full'>Start</Button>
                </div>
                <div>
                    <Image alt={'courseImage'} src={'/book.jpg'} width={300} height={300} className='w-full rounded-xl h-[250px] object-cover' />
                </div>
            </div>
        </div>
    )
}

export default CourseBasicInfo