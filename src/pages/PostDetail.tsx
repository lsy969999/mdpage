import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useNavigate, useParams,  } from "react-router-dom"
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import mermaid from "mermaid";
const PostDetail = () => {
    const [mdText, setMdText] = useState<string>();
    const { postName } = useParams();
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    };

    useEffect(()=>{
        (async () => {
            try {
                const { default: path } = await import(`../posts/markdown/${postName}.md`)
                const res = await fetch(path)
                const md = await res.text()
                setMdText(md)
            } catch(err) {
                console.error('error while import md', err)
            }
        })()
    }, [ postName ])
    const renderMermaid =  (code: string) => {
        const loadingTemp = `mermaidLoading${Math.random().toString().replace(".", "")}`
        const uniqueId = `mermaidGraph${Math.random().toString().replace(".", "")}`;
        try {
            mermaid.render(uniqueId, code).then(res => {
                const qr = document.querySelector('#' + loadingTemp)
                if(qr) {
                    qr.innerHTML = res.svg
                }
            });
            return <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} id={loadingTemp}></div>;
        } catch (err) {
            console.error('Mermaid rendering error:', err);
            return <code>{code}</code>; // 렌더링 실패 시 평범한 코드 블록으로 대체
        }
    };
    return (
        <>
            <button onClick={ handleGoBack }>Back</button>
            <hr/>
            <Markdown
                children={ mdText }
                remarkPlugins={ [ remarkGfm ] }
                // rehypePlugins={ [ [] ] }
                components={{
                    code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        if (match) {
                            return match[1] === "mermaid"
                                ? renderMermaid(String(children).trim())
                                : <SyntaxHighlighter
                                    style={prism}
                                    language={match[1]}
                                    children={String(children).replace(/\n$/, '')}
                                  />;
                        }
                        return <code className={className} {...props}>{children}</code>;
                    }
                }}
            />
        </>
    )
}

export default PostDetail