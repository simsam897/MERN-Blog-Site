import React from 'react'
import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const DashSidebar = () => {
  const location = useLocation()
  const [tab, setTab] = useState("")

  useEffect(() => {
    const urlParans = new URLSearchParams(location.search)
    const tabFromUrl = urlParans.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }

  }, [location.search])
  return (
    <Sidebar className='w-full md:w-56'>
      <SidebarItems>
        <SidebarItemGroup>
          <Link to='/dashboard?tab=profile'>
            <SidebarItem active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark'>
              Profile
            </SidebarItem>
          </Link>
          <SidebarItem icon={HiArrowSmRight} className='cursor-pointer' >
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  )
}

export default DashSidebar