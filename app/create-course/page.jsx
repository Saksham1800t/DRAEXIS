"use client"
import { Button } from '@/components/ui/button'
import React, { use, useContext, useState } from 'react'
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from 'react-icons/hi2'
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '@/app/_context/UserInputContext'
import LoadingDialog from './_components/LoadingDialog'
import { GenerateCourseLayout_AI } from '@/configs/AiModel'
import { db } from '@/configs/db'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { CourseList } from '@/configs/schema'
import { useRouter } from 'next/navigation'

function CreateCourse() {

  const stepper = [
    {
      id: 1,
      name: 'Category',
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: 'Topic & Desc',
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: 'Options',
      icon: <HiClipboardDocumentCheck />,
    },
  ]

  const router = useRouter();
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();

  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true
    }
    if (activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
      return true;
    }
    if (activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
      return true;
    }
    else if (activeIndex == 2 && (userCourseInput?.level?.length == 0 || userCourseInput?.level == undefined || userCourseInput?.duration?.length == 0 || userCourseInput?.duration == undefined || userCourseInput?.displayVideo?.length == 0 || userCourseInput?.displayVideo == undefined)) {
      return true
    }
    return false
  }

  const generateCourseLayout = async () => {
    setLoading(true)
    const BASIC_PROMPT = 'Generate A Course Tutorial on Following detail With field as Course Name, Description, Along with Chapter Name, about, Duration:';
    const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', Topic: ' + userCourseInput?.topic + ', level: ' + userCourseInput?.level + ', Duration: ' + userCourseInput?.duration + ', No of Chapters: ' + userCourseInput?.noOfChapter + ', in JSON format';
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text());
    console.log(JSON.parse(result.response?.text()));
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response?.text()));
  }

  const SaveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4();
    setLoading(true);
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl
    })
    console.log("finish.");
    setLoading(false);
    router.replace('/create-course/' + id)
  }

  return (
    <div>
      <div>
        <div className='flex flex-col justify-center items-center mt-10'>
          <h2 className='text-4xl text-blue-600 font-medium'>Create Course</h2>
          <div className='flex mt-10'>
            {stepper.map((item, index) => (
              <div key={item.id} className='flex items-center'>
                <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                  <div
                    className={`p-3 rounded-full text-white transition-all duration-300 ${activeIndex >= index ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                  >
                    {item.icon}
                  </div>
                  <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                </div>
                {index !== stepper.length - 1 && (
                  <div
                    className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] transition-all duration-300 ${activeIndex > index ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

        </div>
        <div className='px-10 md:px-20 lg:px-44 mt-10'>
          {/* {component} */}
          {activeIndex == 0 ? <SelectCategory /> : activeIndex == 1 ? <TopicDescription /> : <SelectOption />}
          {/* buttons */}
          <div className='flex justify-around mt-10'>
            <Button disabled={activeIndex === 0} variant='outline' onClick={() => setActiveIndex(activeIndex - 1)}>Previous</Button>
            {activeIndex < 2 && <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}
            {activeIndex == 2 && < Button disabled={checkStatus()} onClick={() => generateCourseLayout()}>Generate Course Layout</Button>}
          </div>
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div >
  )
}

export default CreateCourse