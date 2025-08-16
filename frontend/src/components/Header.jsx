import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Button, Dropdown, Avatar } from 'flowbite-react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { TextInput } from 'flowbite-react'
import { NavbarToggle, NavbarCollapse, NavbarLink, DropdownItem, DropdownHeader, DropdownDivider } from 'flowbite-react'
import { useSelector } from 'react-redux'
function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user)
  return (
    <>


      <Navbar className='border-b-2'>

        <Link to="/" className='w-100px h-100px'> <img className='w-[50px] h-[50px]  dark:bg-gray-900 rounded-2xl' src="ChatGPT Image Aug 10, 2025, 09_59_44 PM.png" alt="" /></Link>

        <form > <TextInput type="text" placeholder="
Search..." rightIcon={AiOutlineSearch} className='hidden lg:inline' /></form>

        <Button className="w-12 h-10  color='gray' lg:hidden pill "> <AiOutlineSearch /></Button>


        <div className='flex gap-2 md:order-2'>

          <Button className='w-12 h-10 hidden md:inline lg:inline color="gray" pill '> <FaMoon /> </Button>

          {currentUser ? (
            <Dropdown arrowIcon={false} inline label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }>
              <DropdownHeader>
                <span className='block text-sm font-medium text-red-500'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </DropdownHeader>
              <Link to={'/dashboard?tab=profile'}>
                <DropdownItem>Profie</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem>Sign out</DropdownItem>

            </Dropdown>
          ) :
            (

              <Link to='/signIn'> <Button
                className="color='blue' " outline>Sign In</Button>
              </Link>
            )
          }





          <NavbarToggle />

        </div >

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

export default Header;