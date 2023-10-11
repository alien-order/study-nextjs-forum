import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let hash = await bcrypt.hash(req.body.password, 10)
        let db = (await connectDB).db('forum')
        req.body.password = hash
        console.log(req.body)
        await db.collection('user_cred').insertOne(req.body)
        res.status(200).json('가입완료')
    }
}