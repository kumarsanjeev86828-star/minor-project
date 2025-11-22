import {db} from "@/config/db";
import { coursesTable ,usersTable} from "@/config/schema";
import {NextResponse} from "next/server";
import { eq,desc} from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req){

const {searchParams}= new URL (req.url);
const courseId= searchParams?.get('courseId')
const user= await currentUser();

if(courseId){
const result = await db.select().from(coursesTable).where(eq(coursesTable.cid,courseId));
console.log(result);

return NextResponse.json(result[0]);
}
else{
    const result = await db.select().from(coursesTable).where(eq(coursesTable.userEmail,user.primaryEmailAddress?.emailAddress)).orderBy(desc(coursesTable.id));
console.log(result);
return NextResponse.json(result);

}
}

// import { db } from '@/config/db';
// import { coursesTable } from '@/config/schema';
// import { currentUser } from '@clerk/nextjs/server';
// import { GoogleGenAI } from '@google/genai';
// import { NextResponse } from 'next/server';
// import axios from 'axios';

// const PROMPT = `Generate learning course depends on following details. In which Make sure to add Course name, description ,chapter name, image prompt ... (your existing prompt) ... User Input:`;

// export async function POST(req) {
//   try {
//     const { courseId, ...formData } = await req.json();
//     const user = await currentUser();

//     const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
//     const config = { responseMimeType: 'text/plain' };
//     const model = 'gemini-2.5-flash';

//     const contents = [{ role: 'user', parts: [{ text: PROMPT + JSON.stringify(formData) }] }];

//     const response = await ai.models.generateContent({ model, config, contents });
//     const RawResp = response?.candidates[0]?.content?.parts[0]?.text || '';
//     const RawJson = RawResp.replace('```json', '').replace('```', '');
//     const JSONResp = JSON.parse(RawJson);

//     const ImagePrompt = JSONResp.course?.bannerImagePrompt;
//     const bannerImageUrl = await GenerateImage(ImagePrompt);

//     await db.insert(coursesTable).values({
//       ...formData,
//       courseJson: JSONResp,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//       cid: courseId,
//       bannerImageUrl,
//     });

//     return NextResponse.json({ courseId });
//   } catch (error) {
//     console.error("Courses API error:", error);
//     return NextResponse.json({ error: error?.message || 'Unknown error' }, { status: 500 });
//   }
// }

// const GenerateImage = async (imagePrompt) => {
//   const BASE_URL = 'https://aigurulab.tech';
//   const result = await axios.post(
//     BASE_URL + '/api/generate-image',
//     { width: 1024, height: 1024, input: imagePrompt, model: 'flux', aspectRatio: '16:9' },
//     { headers: { 'x-api-key': process.env.AI_GURU_LAB_API, 'Content-Type': 'application/json' } }
//   );
//   return result.data.image;
// };
