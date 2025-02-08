import React from 'react'
import Cards from "../components/Questioncard"
import Footer from "../components/Footer"

function Addictiontest() {
  return (
    <div>
    <h1 className='text-center relative top-[50px] font-archivo text-4xl leading-[48px] font-bold text-neutral-900'>
      GIVE THE ADDICTION TEST BY ANSWERING THE BELOW QUESTIONS!!
    </h1>
    <Cards/>
    <Footer/>
   </div>
  )
}

export default Addictiontest