import { db } from '@/config/db';
import { coursesTables } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
// import { useAuth } from '@clerk/nextjs';
import {
  GoogleGenAI,
} from '@google/genai';
import { NextResponse } from 'next/server';
// import axios from 'axios';

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
"chapters":[
{
"chapter name":"string",
"duration":"string",
"topics":[
"string"
],
"image prompt":"string"
}
]
}
},User Input: React js,3 Chapters`



export async function POST(req) {
    const formData=await req.json();

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
  const model = 'gemini-2.5-flash';
  // const model = "gemini-1.5-flash"; // or "gemini-pro"

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

  //Save to Database
  const result= await db.insert(courseTable).values({
    ...formData,
    courseJson:JSONResp,
    userEmail:user?.primaryEmailAddress?.emailAddress
  });


  console.log(response.candidates[0].content.parts[0].text);
  const RawResp=response?.candidates[0]?.content?.parts[0]?.text
 const RawJson = RawResp.replace('```json', '').replace('```', '');
  const JSONResp=JSON.parse(RawJson);



  // return NextResponse.json(response.text());
  return NextResponse.json(JSONResp);


}








//to test
// export async function POST(req) {
//   return NextResponse.json({ message: "API working" });
// }
