"use client"
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';

function CourseLayout({ params: paramsPromise }) {

    const { user } = useUser();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const params = React.use(paramsPromise);

    useEffect(() => {
        params && GetCourse();
    }, [params, user]);

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(and(eq(CourseList.courseId, params?.courseId), eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)));
        setCourse(result[0]);
        console.log(result[0]);

    }

    const GenerateChapterContent = async () => {
        if (!course?.courseOutput?.Chapters) return;

        setLoading(true);

        try {
            const processedChapters = new Set();
            const chapters = course.courseOutput.Chapters;

            for (const [index, chapter] of chapters.entries()) {
                // Avoid regenerating content for the same chapter
                if (processedChapters.has(chapter.ChapterName)) continue;
                processedChapters.add(chapter.ChapterName);

                const PROMPT = `Explain the concept in Detail on Topic: ${course?.name}, Chapter: ${chapter?.ChapterName} in JSON Format with a list of arrays with fields as title, explanation on given chapter in detail, and Code Example (Code field in <precode> format) if applicable`;

                console.log("Generating content for:", chapter.ChapterName);

                // Generate video
                let videoId = '';
                try {
                    const res = await service.getVideos(`${course?.name}:${chapter?.ChapterName}`);
                    videoId = res[0]?.id?.videoId || '';
                } catch (videoError) {
                    console.log('Video generation error:', videoError);
                }

                // Generate content
                let content = null;
                try {
                    const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
                    const responseText = await result?.response?.text();
                    content = safeJsonParse(responseText);
                } catch (jsonError) {
                    console.error("JSON Parsing Error:", jsonError);
                    continue;
                }

                if (!content) continue;

                // Save content
                await db.insert(Chapters).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    content: content,
                    videoId: videoId
                });

                console.log(`Chapter ${chapter.ChapterName} content saved successfully.`);
            }

            // Mark course as published
            await db.update(CourseList).set({ publish: true });

            // Redirect
            router.replace(`/create-course/${course?.courseId}/finish`);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Utility function to handle JSON parsing safely
    const safeJsonParse = (str) => {
        try {
            return JSON.parse(str);
        } catch (error) {
            console.error("Invalid JSON Format:", error.message);
            return null;
        }
    };

    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44'>
            <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

            <LoadingDialog loading={loading} />

            {/* info */}

            <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

            {/* details */}

            <CourseDetail course={course} />

            {/* lesson */}

            <ChapterList course={course} refreshData={() => GetCourse()} />

            <Button onClick={GenerateChapterContent} className='my-10'>
                Generate Course Content
            </Button>

        </div>
    )
}

export default CourseLayout