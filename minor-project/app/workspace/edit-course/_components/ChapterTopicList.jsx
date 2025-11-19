import React from "react";
import { Gift } from "lucide-react";

function ChapterTopicList({ course }) {
  const courseLayout = course?.courseJson?.course;

  return (
    <div>
      <h2 className="font-bold text-3xl mt-10">Chapters & Topics</h2>

      <div className="flex flex-col items-center justify-center mt-10">
        {courseLayout?.chapters?.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="flex flex-col items-center w-full">

            {/* Chapter Header */}
            <div className="p-4 px-8 border shadow rounded-xl bg-primary text-white text-center mt-8">
              <h2 className="font-semibold">Chapter {chapterIndex + 1}</h2>
              <h2 className="font-bold text-lg">{chapter.chapterName}</h2>
              <div className="text-xs flex justify-center gap-10 mt-1">
                <span>Duration: {chapter?.duration}</span>
                <span>No. of Topics: {chapter?.topics?.length}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-8">
              {chapter?.topics?.map((topic, topicIndex) => (
                <div key={topicIndex} className="flex flex-col items-center">
                  
                  {/* vertical line */}
                  <div className="h-10 bg-gray-300 w-1"></div>

                  <div className="grid grid-cols-3 items-center gap-6 w-[800px]">
                    {/* LEFT topic */}
                    <div className="text-right pr-4">
                      {topicIndex % 2 === 0 && (
                        <p className="max-w-xs">{topic}</p>
                      )}
                    </div>

                    {/* NUMBER circle */}
                    <div className="flex justify-center">
                      <div className="rounded-full bg-gray-300 w-16 h-16 flex items-center justify-center text-gray-700 font-semibold text-lg">
                        {topicIndex + 1}
                      </div>
                    </div>

                    {/* RIGHT topic */}
                    <div className="text-left pl-4">
                      {topicIndex % 2 !== 0 && (
                        <p className="max-w-xs">{topic}</p>
                      )}
                    </div>
                  </div>

                  {/* Gift section at end */}
                  {topicIndex === chapter?.topics?.length - 1 && (
                    <>
                      <div className="h-10 bg-gray-300 w-1"></div>
                      <Gift className="h-14 w-14 bg-gray-300 text-gray-600 rounded-full p-3" />
                      <div className="h-10 bg-gray-300 w-1"></div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Finish */}
        <div className="p-4 border shadow rounded-xl bg-green-600 text-white mt-8">
          <h2>Finish</h2>
        </div>
      </div>
    </div>
  );
}

export default ChapterTopicList;



// import React from "react";
// import { Gift } from "lucide-react";

// function ChapterTopicList({ course }) {
//   const courseLayout = course?.courseJson?.course;

//   return (
//     <div>
//       <h2 className="font-bold text-3xl mt-10">Chapters & Topics</h2>

//       <div className="flex flex-col items-center justify-center mt-10">
//         {courseLayout?.chapters?.map((chapter, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="p-4 border shadow rounded-xl bg-primary text-white">
//               <h2 className="text-center">Chapter {index + 1}</h2>
//               <h2 className="font-bold text-lg text-center">
//                 {chapter.chapterName}
//               </h2>
//               <h2 className="text-xs flex justify-between gap-16">
//                 <span>Duration: {chapter?.duration}</span>
//                 <span>No. of Topics: {chapter?.topics?.length}</span>
//               </h2>
//             </div>

//             <div>
//               {chapter?.topics?.map((topic, index) => (
//                 <div className="flex flex-col items-center" key={index}>
//                   <div className="h-10 bg-gray-300 w-1"></div>

//                   <div className="flex items-center gap-5">
//                     <span
//                       className={`${
//                         index % 2 !== 0 && "text-transparent"
//                       } max-w-xs`}
//                     >
//                       {topic}
//                     </span>

//                     <h2 className="text-center rounded-full bg-gray-300 px-6 text-gray-500 p-4">
//                       {index + 1}
//                     </h2>

//                     <span
//                       className={`${
//                         index % 2 !== 0 && "text-transparent"
//                       } max-w-xs`}
//                     >
//                       {topic}
//                     </span>
//                   </div>

//                   {index == chapter?.topics?.length - 1 && 
//                       <div className="h-10 bg-gray-300 w-1"></div>}
//                   {index == chapter?.topics?.length - 1 && 
//                       <div className="flex items-center gap-5">
//                         <Gift className="text-center rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4" />
//                       </div>
//                     }
//                     {index == chapter?.topics?.length - 1 && 
//                       <div className="h-10 bg-gray-300 w-1"></div>}
                     
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="p-4 border shadow rounded-xl bg-green-600 text-white mt-4">
//           <h2>Finish</h2>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ChapterTopicList;
