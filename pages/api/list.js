import { connectDB } from "@/util/database"

export default async function List(req, res){
    if(req.method === 'GET') {
        const db = (await connectDB).db("forum")
        let result = await db.collection('post').find().toArray()
        return res.status(200).json(result)
    } else {
        return res.status(404).json()
    }
}