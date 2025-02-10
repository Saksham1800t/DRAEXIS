import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import EditCourseInfo from "./EditCourseInfo";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function CourseBasicInfo({ course, refreshData }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (course?.courseBanner) {
            setImageUrl(course.courseBanner);
        }
    }, [course]); // Runs when course data changes

    const onFileSelected = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(URL.createObjectURL(file)); // Show preview before upload

        // Upload to Cloudinary & Update Database
        const uploadedUrl = await uploadImage(file);

        if (uploadedUrl) {
            // ✅ Save Image URL in Database, then update state
            await updateCourseBanner(uploadedUrl);
        }
    };

    const uploadImage = async (file) => {
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // Replace with your Cloudinary Upload Preset

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // Replace with your Cloudinary Cloud Name
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.secure_url) {
                console.log("Uploaded Image URL:", data.secure_url);
                setUploading(false);
                return data.secure_url;
            } else {
                console.error("Cloudinary upload failed:", data);
                setUploading(false);
                return null;
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setUploading(false);
            return null;
        }
    };

    // 🔹 Function to Update Database with Image URL
    const updateCourseBanner = async (url) => {
        try {
            const res = await db
                .update(CourseList)
                .set({ courseBanner: url })
                .where(eq(CourseList.id, course?.id));

            console.log("Database Updated:", res);

            setImageUrl(url);

          
            refreshData();
        } catch (error) {
            console.error("Error updating database:", error);
        }
    };

    return (
        <div className="p-10 border rounded-xl shadow-sm mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h2 className="font-bold text-2xl">
                        {course?.courseOutput?.CourseName}{" "}
                        <EditCourseInfo course={course} refreshData={() => refreshData(true)} />
                    </h2>
                    <p className="text-sm text-gray-400 mt-3">{course?.courseOutput?.Description}</p>
                    <h2 className="font-medium mt-2 flex gap-2 items-center text-blue-500">
                        Category: {course?.courseOutput?.Category}
                    </h2>
                    <Button className="mt-5 w-full">Start</Button>
                </div>
                <div>
                    <label htmlFor="upload-image">
                        <Image
                            alt={"courseImage"}
                            src={imageUrl || selectedFile || "/book.jpg"}
                            width={300}
                            height={300}
                            className="w-full rounded-xl h-[250px] object-cover cursor-pointer"
                        />
                    </label>
                    <input type="file" id="upload-image" className="opacity-0" onChange={onFileSelected} />
                    {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
                </div>
            </div>
        </div>
    );
}

export default CourseBasicInfo;
