export async function POST(req) {
    const{course,courseTitle,courseID}=await req.json();
}
import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { coursesTable } from "@/config/schema";

const PROMPT = `Depends on Chapter name and Topic Generate cont
and give response in JSON format.

Schema:{
  chapterName: <>,
  topic: <>,
  content: <>
}

: User Input:
`;

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();
  const promises=courseJson?.chapters?.map(async(chapter)=>{
    const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };
  const model = 'gemini-2.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT+JSON.stringify(chapter),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  // console.log(response.candidates[0].content.parts[0].text);
   RawResp=response.candidates[0].content.parts[0].text
   const RawJson = RawResp.replace('```json', '').replace('```', '');
  const JSONResp=JSON.parse(RawJson);
  //GET Youtube Videos
  const youtubeData=await GetYoutubeVideo(chapter?.chapterName);
  console.log({
    youtubeVideo:youtubeData,
    courseData:JSONResp
  })
  return {
    youtubeVideo:youtubeData,
    courseData:JSONResp
  };
  })
  const CourseContent=await Promise.all(promises)
  //save to DB
  const dbResp=await db.update(coursesTable).set({
    courseContent:CourseContent
  }).where(eq(coursesTable.cid,courseId))
  return NextResponse.json({
    courseName:courseTitle,
    CourseContent:CourseContent
  })
}
const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search'
const GetYoutubeVideo=async(topic)=>{
const params={
    part:'snippet',
    q:topic,
    maxResult:4,
    type:'video',
    key:  process.env.YOUTUBE_API_KEY  //Youtube API KEY
}
const resp=await axios.get(YOUTUBE_BASE_URL,{params});
const youtubeVideoListResp=resp.data.items;
const youtubeVideoList=[];
youtubeVideoListResp.forEach(item=>{
    const data={
        videoID:item.id?.videoID,
        title:item?.snippet?.title
    }
    youtubeVideoList.push(data);
})
console.log("youtubeVideoList",youtubeVideoList)
return youtubeVideoList;
}
