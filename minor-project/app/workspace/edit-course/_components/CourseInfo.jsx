"use client";
import React, { useState } from "react";
import { Clock, TrendingUp,Book,Settings,Gift} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
function CourseInfo({course}){
    const courseLayout=course?.courseJson?.course;
    const[loading,setLoading ]= useState( false);
    const router= useRouter();
    const GenerateCourseContent = async () => {
    setLoading(true)
    try {
        const result = await axios.post('/api/generate-course-content', {
            courseJson: courseLayout,
            courseTitle: course?.name,
            courseId: course?.cid
        });

        console.log( result.data);
setLoading(false);
router.replace('/workspace')
toast.success('Course Generated Sucessfully')
    } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Server Side error,Try Again!")
    }
}
  
    return(
        // <div>CourseInfo</div>
 
        <div className="md:flex gap-5 justify-between p-5 rounded-2xl shadow">
            <div className="flex flex-col gap-3">
                <h2 className="font-bold text-3xl">{courseLayout?.name}</h2>
                <p className="line-clamp-2 text-gray-500">{courseLayout?.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                   <div className="flex gap-5 items-center p-3 rounded-lg shadow">
                    <Clock className="text-blue-500"/>
                    <section>
                        <h2 className="font-bold">Duration</h2>
                        <h2>2 hours</h2>
                    </section>
                   </div>

                   <div className="flex gap-5 items-center p-3 rounded-lg shadow">
                    <Book className="text-green-500"/>
                    <section>
                        <h2 className="font-bold">Chapters</h2>
                        <h2>2 hours</h2>
                    </section>
                   </div>

                   <div className="flex gap-5 items-center p-3 rounded-lg shadow">
                    <TrendingUp className="text-red-500"/>
                    <section>
                        <h2 className="font-bold">Difficulty Level</h2>
                        <h2>{course?.level}</h2>
                    </section>
                   </div>
                </div>
                <Button className={'max-w-sm'}><Settings/>Generate Content</Button>
            </div>
            {/* <Image src={course?.bannerImageUrl} alt ={'banner Image'}
            width={400}
            height={400}
            className='w-full h-[240px] rounded-2xl'/> */}
            {course?.bannerImageUrl ? (
  <Image
    src={course.bannerImageUrl}
    alt="banner image"
    width={400}
    height={400}
    className="w-full h-[240px] rounded-2xl object-cover"
  />
) : (
  <div className="w-full mt-5 md:mt-0 object-cover aspect-auto h-[240px] rounded-2xl bg-gray-200 flex items-center justify-center">
    <p className="text-gray-500">No Banner Image</p>
  </div>
)}

        </div>
    )
}
export default CourseInfo