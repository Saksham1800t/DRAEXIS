"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { Button } from '@/components/ui/button';

function Explore() {

  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    getAllcourse();
  }, [pageIndex])

  const getAllcourse = async () => {
    const result = await db.select().from(CourseList)
      .limit(9).offset(pageIndex * 9);
    setCourseList(result)
  }

  return (
    <div>
      <h2 className='font-bold text-3xl'>Explore More Project here...</h2>
      <p>Explore more projects build by AI by other users</p>

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList?.length > 0 ? courseList?.map((course, index) => (
          <div key={index}>
            <CourseCard course={course} displayUser={true} />
          </div>
        )) :
          [1, 2, 3].map((item, index) => (
            <div key={index} className='w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[260px]'>
            </div>
          ))}
      </div>

      <div className='flex justify-between mt-5'>
        {pageIndex != 0 && <Button onClick={() => setPageIndex(pageIndex - 1)}>Previous Page</Button>}
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
      </div>

    </div>
  )
}

export default Explore