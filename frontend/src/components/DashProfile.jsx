import React from 'react'
import { useSelector } from 'react-redux'
import { TextInput, Button } from 'flowbite-react'
const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user)
  return (


    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile </h1>
      <from className="flex flex-col gap-4"> <div className='w-32 h-32 self-center cursor-pointer shadow-md  rounded-full'>

        <img src={currentUser.profilePicture} alt="" className='rounded-full w-full object-cover border-8 border-gray-400' />
      </div>

        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}></TextInput>

        <TextInput type="text" id="email" placeholder="email" defaultValue={currentUser.email}></TextInput>


        <TextInput type="text" id="password" placeholder="password" defaultValue="********"></TextInput>


        <Button type='submit' className='border-5 border-purple-700  ' outline>Update</Button>
      </from>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointr'>Sign Out</span>
      </div>
    </div >
  )
}

export default DashProfile
