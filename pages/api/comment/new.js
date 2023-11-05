import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export default async function handler(req, res){
    if (req.method === 'POST') {
        let session = await getServerSession(req, res, authOptions)
        req.body = JSON.parse(req.body)

        if (session) {
            req.body.author = session.user.email
        }
        
        const db = (await connectDB).db('forum')
        let result = await db.collection('comment').insertOne(
            { 
                author : req.body.email,
                parent : new ObjectId(req.body.parent),
                content : req.body.content
            })
        console.log(result)

        if (result) res.status(200).json('댓글저장성공')
    }
}