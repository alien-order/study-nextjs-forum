import { connectDB } from "@/util/database"

export default async function handler(req, res){
    if(req.method === "POST") {
        let title = req.body.title
        let content = req.body.content
        
        const db = (await connectDB).db("forum")
        let result = await db.collection('post').insertOne({ title, content })
    }
    
    return res.status(200).redirect("/list")
}