import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterComp = () => {
  return (
    <footer className="border border-t-8 border-teal-500 w-full bg-green">



      <div className='w-[100%] flex flex-col md:flex-col  lg:flex-row space-x-10  overflow-hidden'>

        <div className='   sm:w-full md:w-full sm:justify-center md:flex md:justify-center lg:w-[40%] m-auto '>
          <Link to="/" className='w-100px h-100px '> <img className='w-[80px] h-[50px]  dark:bg-gray-900 rounded-2xl  self-center' src="ChatGPT Image Aug 10, 2025, 09_59_44 PM.png" alt="" /></Link>
        </div>
        {/* grid div  */}
        <div className='grid grid-cols-2 md:grid-cols-3 md:w-full lg:grid-cols-3  w-[100%]'>
          <div>
            <h4><a href="/about" className='text-white'>About</a></h4>

            <h2><a href="/">Home</a></h2>

            <h2><a href="/projects">Projects</a></h2>
          </div>
          <div>
            <h4><a href="/about" className='text-white'>About</a></h4>

            <h2><a href="/">Home</a></h2>

            <h2><a href="/projects">Projects</a></h2>
          </div>
          <div className='mb-6'>
            <h4><a href="/about" className='text-white'>About</a></h4>

            <h2><a href="/">Home</a></h2>

            <h2><a href="/projects">Projects</a></h2>
          </div>

        </div>
      </div>


    </footer>
  )
}

export default FooterComp