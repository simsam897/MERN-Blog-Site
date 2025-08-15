import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextInput, Button, Spinner, Alert } from 'flowbite-react'
import { useState } from 'react'
import { signInFailure, signInSuccess, signInStart } from '../redux/Slice/userSlice'

import { useDispatch, useSelector } from "react-redux"
import OAuth from '../components/OAuth'
const SignIn = () => {
  const [formData, setFormData] = useState({})
  const { loading, error: errorMessage } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    // console.log(e.target.value);

    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'))
      
    }
    try {
      dispatch(signInStart())

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)

      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      // setLoading(false)
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {

      dispatch(signInFailure(error.message))


    }
  }
  return (

    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>

        {/* left side   */}
        <div className='flex-1 '>
          <div className='flex flex-col justify-center items-center md:justify-start md:items-start'>
            <Link to="/" className=''> <img className='w-[150px] h-[150px]  dark:bg-gray-900 rounded-2xl' src="ChatGPT Image Aug 10, 2025, 09_59_44 PM.png" alt="" /></Link>
            <div>
              <span>this is blogsite project , you can check the blogs after login</span>
            </div>
          </div>
        </div>

        {/* right side */}

        <div className='flex-1'>
          <form className=' flex flex-col  gap-4' onSubmit={handleSubmit}>

            <div>
              {/* <Label value='Your username' className="text-gray-900 dark:text-white" />\ */}
            </div>
            <div>
              <label htmlFor="username">Your Email</label>
              <TextInput type="email" placeholder="
          ss12@gmail.com" id='email' className=' ' onChange={handleChange} />

            </div>
            <div>
              <label htmlFor="username">Your password</label>
              {/* 
                <Label htmlFor="password1" className='text-gray-900   dark:text-white'>Your password</Label> */}

              <TextInput type="password" placeholder="
          grg5335geg" id='password' className='' onChange={handleChange} />

            </div>


            <Button
              className="color='blue  " disabled={loading} type='submit' outline >{
                loading ? (
                  <>

                    <Spinner size="sm" />
                    <span className='p-3'>Loading..</span>  </>) : "sign In"}
            </Button>


            <OAuth />

          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Create  account</span>
            <Link to='/signUp' className='text-blue-500'>Sign Up</Link>
          </div>

          {errorMessage && (<Alert className="mt-5" color="red">{errorMessage}</Alert>)}
        </div>
      </div>

    </div>

  )
}

export default SignIn