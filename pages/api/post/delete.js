import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
    
    let session = await getServerSession(req, res, authOptions)

    if (req.method === 'DELETE') {
        let data = JSON.parse(req.body)
        console.log(data)
        console.log(session.user.email)
        console.log(data.author)
        if (session.user.email === data.author) {
            const db = (await connectDB).db("forum")
            let result = await db.collection('post').deleteOne({ _id : new ObjectId(data._id) })
            console.log(result)
            if (result.deletedCount == 1) {
                res.status(200).json('삭제완료')
            }
        } else {
            console.log('작성자만 삭제할 수 있습니다')
            res.status(500).json('삭제실패')
        }
    }
}