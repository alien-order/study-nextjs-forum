import { connectDB } from "@/util/database"
import Link from "next/link"
import ListItem from "./ListItem"

export const revalidate = 60

export default async function List() {
    
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').find().toArray()
    result.map((a, i) => {
        result[i]._id = result[i]._id.toString()
    })

    return (
        <div className="list-bg">
            <ListItem result={ result }></ListItem>
        </div>
    )
}