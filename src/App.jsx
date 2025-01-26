import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getPost } from './api/PostApi'
import Post from './components/Post'


function App() {

  return (
    <>
      <section className="main-section">

        <Post />
      </section>

    </>
  )
}

export default App
