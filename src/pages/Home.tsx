import Markdown from "react-markdown"
import test from '../assets/markdown/test.md';

const Home = () => {
    return (
        <>
            <div>Home</div>
            <Markdown>
                { test }
            </Markdown>
        </>
    )
}

export default Home