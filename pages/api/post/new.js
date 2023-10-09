import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res){
    
    let session = await getServerSession(req, res, authOptions)
    console.log(session)

    if (session) {
        req.body.author = session.user.email
    }

    console.log(req.body)

    if(req.method === "POST") {
        const db = (await connectDB).db("forum")

        let data = {
            title : req.body.title,
            content : req.body.content,
            author : req.body.author
        }
        console.log(data)
        let result = await db.collection('post').insertOne(req.body)
        
        res.redirect(302, '/list')
    }
}