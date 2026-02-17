import Layout from './components/Layout.jsx'  
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import Missing from './pages/Missing.jsx'
import {  Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'  
import Signup from './pages/Signup.jsx' 
import './App.css'


function App() {
   
  
   
  
  return (
    <>
      
    <Routes> 
      
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="post" element={<Blog  />} />
        <Route path="post/:id" element={<ArticlePage  />} />
        
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    </>
  )
    }

export default App
