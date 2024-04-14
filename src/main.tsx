import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout.tsx'
import Posts from './pages/Posts.tsx'
import PostDetail from './pages/PostDetail.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Layout />}>
                <Route index element={ <Posts /> }/>
                <Route path='post/:postName' element={ <PostDetail/> } />
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
