//new
import { db } from "@/config/db";

import { eq } from "drizzle-orm";
import { usersTable } from "@/config/schema";

//new
import { NextResponse } from "next/server";



export async function POST(req){
    const {email,name}= await req.json();
    //if user already exists ?
    const users= await db.select().from (usersTable)
    .where (eq(usersTable.email,email));
    //if not then insert new user
    if(users?.length == 0){
        const result= await db.insert
        (usersTable).values({
            name:name,
            email:email
        }) .returning(usersTable);
        console.log (result)
return NextResponse.json(result)
    }
    return NextResponse.json(users[0])
}


//Alteranative Code I got from chatgpt:
// app/api/user/route.js
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("Incoming data:", body);
//     return NextResponse.json({ message: "It works!" });
//   } catch (error) {
//     console.error("Error in /api/user:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
