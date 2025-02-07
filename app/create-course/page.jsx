"use client"
import { Button } from '@/components/ui/button'
import React, { use, useContext, useEffect, useState } from 'react'
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from 'react-icons/hi2'
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '@/app/_context/UserInputContext'

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

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log(userCourseInput);

  }, [userCourseInput])

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
    else if(activeIndex==2 && (userCourseInput?.level?.length == 0 || userCourseInput?.level == undefined || userCourseInput?.duration?.length == 0 || userCourseInput?.duration == undefined || userCourseInput?.displayVideo?.length == 0 || userCourseInput?.displayVideo == undefined)){
      return true
    }
    return false
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
                  <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index && 'bg-blue-500'}`}>
                    {item.icon}
                  </div>
                  <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                </div>
                {index != stepper?.length - 1 && <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-200 ${activeIndex - 1 >= index && 'bg-blue-500'}`}></div>}
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
            {activeIndex == 2 && < Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Generate Course Layout</Button>}
          </div>
        </div>

      </div>
    </div >
  )
}

export default CreateCourse