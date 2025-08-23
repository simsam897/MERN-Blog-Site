import React from 'react'
import DashSidebar from '../components/DashSidebar'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DashProfile from '../components/DashProfile'
const Dashboard = () => {
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
    <div className='min-h-screen flex flex-col md:flex-row' >



      <div className='md:w-56'>
        {/* sidebar */}

        <DashSidebar />
      </div>

      {/* profile  */}
      {tab === "profile" && <DashProfile />}

    </div>
  )
}

export default Dashboard