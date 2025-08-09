import React from 'react'
import { Link } from 'react-router-dom';
import { Button, TextInput, Label } from 'flowbite-react';

const SignUp = () => {
  return (
    <>
      <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>

          {/* left side   */}
          <div className='flex-1 '>
            <div className='flex flex-col justify-center items-center md:justify-start md:items-start'>
              <Link to="/" className=''> <img className='w-[150px] h-[150px]  dark:bg-gray-900 rounded-2xl' src="Colorful Stack Logo for StackVerge.png" alt="" /></Link>
              <div>
                <span>this is blogsite project , you can check the blogs after login</span>
              </div>
            </div>
          </div>

          {/* right side */}

          <div className='flex-1'>
            <form className=' flex flex-col  gap-4'>

              <div>
                <Label value='Your username' className="text-gray-900 dark:text-white" />
                <TextInput type="text" placeholder="
          sssingh" id='username' className="bg-white text-black"
                />

              </div>
              <div>
                <Label value='Your emal' />
                <TextInput type="text" placeholder="
          ss12@gmail.com" id='email' className=' ' />

              </div>
              <div>
                <Label value='Your password' />
                <TextInput type="text" placeholder="
          grg5335geg" id='password' className='' />

              </div>


              <Button
                className="color='blue  " type='submit' outline >Sign In</Button>




            </form>

            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account?</span>
              <Link to='/signIn' className='text-blue-500'>Sign In</Link>
            </div>


          </div>
        </div>

      </div></>
  )
}

export default SignUp