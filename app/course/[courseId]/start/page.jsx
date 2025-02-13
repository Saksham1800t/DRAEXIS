"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({ params }) {

    const [course, setCourse] = useState();
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent, setChapterContent] = useState();

    useEffect(() => {
        GetCourse();
    }, [])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId));
        setCourse(result[0]);
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const res = await db.select().from(Chapters).where(and(eq(Chapters.chapterId, chapterId), eq(Chapters.courseId, course?.courseId)));
        setChapterContent(res[0]);
    }

    return (
        <div>
            {/* chapter list */}
            <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
                <h2 className='font-medium text-lg bg-blue-500 p-4 text-white rounded-r-lg'>{course?.courseOutput?.CourseName}</h2>
                <div>
                    {course?.courseOutput?.Chapters.map((chapter, index) => (
                        <div key={index} className={`cursor-pointer hover:bg-blue-50
                            ${selectedChapter?.ChapterName == chapter?.ChapterName && 'bg-blue-100'}`}
                            onClick={() => { setSelectedChapter(chapter); GetSelectedChapterContent(index) }}>
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>
            {/* content */}
            <div className='md:ml-72'>
                <ChapterContent chapter={selectedChapter} content={chapterContent} />
            </div>
        </div>
    )
}

export default CourseStart