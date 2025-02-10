import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditCourseInfo({ course, refreshData }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (course?.courseOutput) {
            setName(course?.courseOutput?.CourseName || "");
            setDescription(course?.courseOutput?.Description || "");
        }
    }, [course?.courseOutput?.CourseName, course?.courseOutput?.Description]);

    const onUpdateHandle = async () => {
        if (!course?.id || !course?.courseOutput) {
            console.error("Invalid course data");
            return;
        }

        try {
            const updatedCourse = {
                ...course,
                courseOutput: {
                    ...course.courseOutput,
                    CourseName: name,
                    Description: description,
                },
            };

            const res = await db
                .update(CourseList)
                .set({ courseOutput: updatedCourse.courseOutput })
                .where(eq(CourseList.id, course.id))
                .returning({ id: CourseList.id });

            refreshData(true);
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <HiPencilSquare />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Title & Description</DialogTitle>
                    <DialogDescription>
                        <div className="mt-3">
                            <label> Course Title</label>
                            <Input value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                className="h-40"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
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
    );
}

export default EditCourseInfo;
