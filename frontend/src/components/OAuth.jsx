import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/Slice/userSlice'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {

    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ promt: 'select-account' })

    try {
      const resultsFromGoogele = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/google', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogele.user.displayName,
          email: resultsFromGoogele.user.email,
          googlePhotoUrl: resultsFromGoogele.user.photoURL
        })
      })
      const data = await res.json()
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')

      }

    } catch (error) {
      console.log(error);

    }
  }
  return (
    <Button className='bg-gradient-to-r from-green-400 t0-blue-700 ' type='button' outline onClick={handleGoogleClick} > <AiFillGoogleCircle className='w-8 h--8 mr-1' />
      Continue with Google</Button>
  )
}

export default OAuth