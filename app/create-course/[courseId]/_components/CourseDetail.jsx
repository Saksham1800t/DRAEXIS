import React from 'react'
import { HiOutlineChartBar, HiOutlineClock, HiOutlineBookOpen, HiOutlinePlayCircle } from 'react-icons/hi2'

function CourseDetail({ course }) {
    return (
        <div className='border p-6 rounded-xl shadow-sm mt-3'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                <div className='flex gap-2 items-center'>
                    <HiOutlineChartBar className='text-4xl text-blue-500' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Skill Level</h2>
                        <h2 className='font-medium text-lg'>{course?.level}</h2>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <HiOutlineClock className='text-4xl text-blue-500' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Duration</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.Duration}</h2>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <HiOutlineBookOpen className='text-4xl text-blue-500' />
                    <div>
                        <h2 className='text-xs text-gray-500'>No. of Chapters</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.NoOfChapters} Chapters</h2>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <HiOutlinePlayCircle className='text-4xl text-blue-500' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Include Video</h2>
                        <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail