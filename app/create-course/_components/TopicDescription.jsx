import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { useContext } from 'react'
import { UserInputContext } from '@/app/_context/UserInputContext'


function TopicDescription() {

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleInputchange = (fieldName, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    return (
        <div className='mx-20 lg:mx-44'>
            {/* topic */}
            <div className='mt-5'>
                <label>Write the topic for which you want to generate the course.</label>
                <Input defaultValue={userCourseInput?.topic} placeholder={'Topic'} className="h-14 text-xl" onChange={(e) => handleInputchange('topic', e.target.value)} />
            </div>
            {/* textarea */}
            <div className='mt-5'>
                <label>Tell us about your course, what you want to generate, (optional)</label>
                <Textarea defaultValue={userCourseInput?.description} placeholder='About your course' className='h-24 text-xl' onChange={(e) => handleInputchange('description', e.target.value)} />
            </div>

        </div>
    )
}

export default TopicDescription