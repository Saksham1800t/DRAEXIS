import CategoryList from '@/app/_shared/CategoryList'
import React, {useContext} from 'react'
import Image from 'next/image'
import { UserInputContext } from '@/app/_context/UserInputContext'

function SelectCategory() {

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleCategoryChange = (category) => {
        setUserCourseInput(prev => ({
            ...prev,
            category: category
        }))
    }

    return (
        <div className='px-10 md:px-20'>
            <h2 className='my-5 ml-20'>Select Cateory</h2>
            <div className='grid grid-cols-3 gap-10 px-10 md:px-20'>

                {CategoryList.map((item, index) => (
                    <div key={item.id} onClick={() => handleCategoryChange(item.name)} className={`flex flex-col border p-5 items-center rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer ${userCourseInput?.category == item.name && 'border-blue-500 bg-blue-50'}`}>
                        <Image src={item.icon} width={80} height={100} alt='category' />
                        <h2>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default SelectCategory