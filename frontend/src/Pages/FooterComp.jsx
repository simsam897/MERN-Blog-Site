import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterComp = () => {
  return (
    <footer className="border border-t-8 border-teal-500 w-full bg-green">



      <div className='w-full flex flex-col md:flex-row lg:flex-row space-x-10 '>
        <div className=' self-center m-10 '>
          <Link to="/" className='w-100px h-100px'> <img className='w-[80px] h-[50px]  dark:bg-gray-900 rounded-2xl' src="ChatGPT Image Aug 10, 2025, 09_59_44 PM.png" alt="" /></Link>
        </div>
        {/* grid div  */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  w-full'>
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