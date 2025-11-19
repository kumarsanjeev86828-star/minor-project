import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
// import { useAuth } from '@clerk/nextjs';
import {
  GoogleGenAI,
} from '@google/genai';
import { NextResponse } from 'next/server';
import axios from 'axios';
// import {v4 as uuidv4} from 'uuid';
const PROMPT=`Generate learning course depends on following details. In which Make sure to add Course name, description ,chapter name, image prompt (Create a modern ,flat-style 2d digital illustration representing user Topic. include you are you as element such as mockup screens, text blocks, Icons, buttons and creative workspace tools. add symbolic elements related to user course like sticky notes design components and visible AIDS use a vibrant colour palette blue's purpose oranges with the clean professional lock the illustration should feel creative tax heavy and educational ideal for visualising concepts in user course for course banner in 3D format topic under each chapter duration for each chapter extra format only
Schema:
{
"course":{
"name": "string",
"description":"string",
"category":"string",
"level":"string",
"include video":Boolean,
"noOfChapters":"number",
"bannerImagePrompt":"string",
"chapters":[
{
"chapter name":"string",
"duration":"string",
"topics":[
"string"
],
}
]
}
}
,User Input: 
`



export async function POST(req) {
    const {courseId,...formData}=await req.json();
try{ //new line of "try"
 const user=await currentUser();
  const ai = new GoogleGenAI({
      apiKey:process.env.GEMINI_API_KEY,
    });

    // To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

  // const config = {
  //   thinkingConfig: {
  //     thinkingBudget: -1,
  //   },
  //   imageConfig: {
  //     imageSize: '1K',
  //   },
  // };


  const config={
  responseMimeType: 'text/plain',
  };
  // const model = 'gemini-2.0-flash';
  const model = "gemini-2.0-pro"; // or "gemini-pro"

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT+JSON.stringify(formData),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });


  // let fileIndex = 0;
  // for await (const chunk of response) {
  //   console.log(chunk.text);
  // }

  // console.log(response.candidates[0].content.parts[0].text);
  console.log(response.candidates[0].content.parts[0].text||"");//newly added 
  // const RawResp=response?.candidates[0]?.content?.parts[0]?.text 
  //newly added line
  const RawResp = response?.candidates[0]?.content?.parts[0]?.text || "";

 const RawJson = RawResp.replace('```json', '').replace('```', '');
  const JSONResp=JSON.parse(RawJson);
  // const courseId=uuidv4();
   const ImagePrompt=JSONResp.course?.bannerImagePrompt;

   //generate Image
   const bannerImageUrl= await GenerateImage(ImagePrompt);
  //Save to Database
  const result= await db.insert(coursesTable).values({
    ...formData,
    courseJson:JSONResp,
    userEmail:user?.primaryEmailAddress?.emailAddress,
    cid:courseId,
    bannerImageUrl:bannerImageUrl
  });

  // return NextResponse.json(response.text());
  return NextResponse.json({courseId:courseId});

}
catch(error){//newly added "catch block"
  console.error("AI or JSON parsing error:",error?.message||error);
}
}

const GenerateImage=async(imagePrompt)=>{
  const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'flux',//sdxl',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.AI_GURU_LAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
console.log(result.data.image) //Output Result: Base 64 Image
return result.data.image;
}





//to test
// export async function POST(req) {
//   return NextResponse.json({ message: "API working" });
// }
