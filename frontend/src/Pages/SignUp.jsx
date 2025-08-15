import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextInput, Alert, Spinner } from 'flowbite-react';
import OAuth from '../components/OAuth';
const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    // console.log(e.target.value);

    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("please fill out all fields")
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)

      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if (res.ok) {
        navigate('/signIn')
      }
    } catch (error) {
      // console.log(error);
      setErrorMessage(error.message)
      setLoading(false)

      // console.log(error);

    }
  }
  return (
    <>
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
                <label htmlFor="username">Your username</label>
                <TextInput type="text" placeholder="
          sssingh" id='username' className="bg-[#dbd6d6]   " onChange={handleChange}
                />

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
                      <span className='p-3'>Loading..</span>  </>) : "sign Up"}
              </Button>

              <OAuth />


            </form>

            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account?</span>
              <Link to='/signIn' className='text-blue-500'>Sign In</Link>
            </div>

            {errorMessage && (<Alert className="mt-5" color="red">{errorMessage}</Alert>)}
          </div>
        </div>

      </div></>
  )
}

export default SignUp