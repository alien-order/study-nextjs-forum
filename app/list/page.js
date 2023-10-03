import { connectDB } from "@/util/database"
import Link from "next/link"
import DetailLink from "./DetailLink"

export default async function List() {
    
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').find().toArray()

    return (
      <div className="list-bg">
        {
            result.map((d, i) => 
                <ListItem title={ d.title } content={ d.content } id={ d._id } key={i}/>
            )
        }
      </div>
    )
}

function ListItem(props){
    return (
        <>
            <div className="list-item">
                <Link href={"./detail/" + props.id}>
                    <h4>{ props.title }</h4>
                </Link>
                <DetailLink></DetailLink>
                <p>{ props.content }</p>
            </div>
        </>
    )
}