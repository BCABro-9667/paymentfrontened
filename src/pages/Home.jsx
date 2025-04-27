import React from 'react'
import '../styles/Home.css'

function Home() {
  return (
    <>
    <div className="container">
        <h2>Can you draw a</h2>
        <h1>Perfect Circle ?</h1>
        <button className='go-btn'><a href="/draw-circle">Go</a></button>
    </div>
    </>
  )
}

export default Home