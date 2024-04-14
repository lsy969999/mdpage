import { Link } from "react-router-dom"
import { mdConfig } from "../posts/mdconfig"

const Posts = () => {
    return (
        <>
            {
                mdConfig.map((item, index) => {
                    return <div key={index}>
                        <Link  to={`post/${item.fileName}`} >{item.title}</Link>
                    </div>
                })
            }
        </>
    )
}

export default Posts
