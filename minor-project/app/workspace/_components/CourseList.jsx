"use client"
import { Button } from '@/components/ui/button';
import React,{ useState } from 'react'
import Image from 'next/image'
import AddNewCourseDialog from './AddNewCourse';
function CourseList(){
  const [courseList,setCourseList] = useState([]);
    return(
        <div>
        <h2 className='font-bold text-3xl'>Course List</h2>
        {courseList?.length ==0 ?
         <div className='flex p-7 items-center justify-center flex-col border rounded-xl bg-secondary'>

            <Image src = {'/online-education.png'} alt ='edu' width={80} height={80}></Image>
            <h2 className='my-2 text-xl font-bold'>Look like you haven't created any Course yet</h2>
            <AddNewCourseDialog>
            <Button>+ Create yout first course</Button>
            </AddNewCourseDialog>
        </div>:
           <div>
             List Of Courses
           </div>}
        </div>
    )
}
export default CourseList