import React from 'react'
import { useSelector } from 'react-redux'
const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme)
  return (
    <div className={theme === "dark"
      ? "bg-black text-gray-200"
      : "bg-white text-gray-700"}>
      {children}


    </div>
  )
}

export default ThemeProvider