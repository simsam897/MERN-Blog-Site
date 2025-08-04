import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Button } from 'flowbite-react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { TextInput } from 'flowbite-react'
import { NavbarToggle, NavbarCollapse, NavbarLink } from 'flowbite-react';
function Header() {
  const path = useLocation().pathname;
  return (
    <>


      <Navbar className='border-b-2'>

        <Link to="/" className='w-100px h-100px'> <img className='w-[50px] h-[50px]  dark:bg-gray-900 rounded-2xl' src="Colorful Stack Logo for StackVerge.png" alt="" /></Link>

        <form > <TextInput type="text" placeholder="
Search..." rightIcon={AiOutlineSearch} className='hidden lg:inline' /></form>

        <Button className="w-12 h-10  color='gray' lg:hidden pill "> <AiOutlineSearch /></Button>


        <div className='flex gap-2 md:order-2'>

          <Button className='w-12 h-10 hidden md:inline lg:inline color="gray" pill '> <FaMoon /> </Button>


          <Link to='/signIn'> <Button
            className="color='blue' ">Sign In</Button>
          </Link>




          <NavbarToggle />

        </div>

        <NavbarCollapse>
          <NavbarLink active={path === '/'} as={'div'}>
            <Link to='/'>Home</Link>
          </NavbarLink>

          <NavbarLink active={path === '/about'} as={'div'}>
            <Link to='/about'>About</Link>
          </NavbarLink>


          <NavbarLink active={path === '/projects'} as={'div'}>
            <Link to='/projects'>Projects</Link>
          </NavbarLink>

        </NavbarCollapse>



      </Navbar >

    </>
  )
}

export default Header