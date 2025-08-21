import React from 'react'
import { useSelector } from 'react-redux'
const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme)
  return (
    <div className={theme === "dark"
      ? "bg-black text-gray-200 min-h-screen"
      : "bg-gray-900 text-gray-700 min-h-screen"}>
      {children}


    </div>
  )
}

export default ThemeProvider