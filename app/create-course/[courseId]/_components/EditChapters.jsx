import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import { CourseList } from '@/configs/schema'


function EditChapters({ course, index, refreshData }) {

    const chapters = course?.courseOutput.Chapters;
    const [name, setName] = useState();
    const [about, setAbout] = useState();

    useEffect(() => {
        setName(chapters[index].ChapterName);
        setAbout(chapters[index].About);
    }, [course])

    const onUpdateHandle = async () => {
        course.courseOutput.Chapters[index].ChapterName = name;
        course.courseOutput.Chapters[index].About = about;
        const res = await db
            .update(CourseList)
            .set({ courseOutput: course.courseOutput })
            .where(eq(CourseList.id, course.id))
            .returning({ id: CourseList.id });

        refreshData(true);

    }

    return (
        <Dialog>
            <DialogTrigger><HiPencilSquare /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapter</DialogTitle>
                    <DialogDescription>
                        <div className="mt-3">
                            <label> Course Title</label>
                            <Input defaultValue={chapters[index].ChapterName} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                className="h-40"
                                defaultValue={chapters[index].About}
                                onChange={(event) => setAbout(event.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandle}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default EditChapters