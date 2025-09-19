



import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button } from 'flowbite-react';
import { updateUserSuccess } from '../redux/Slice/userSlice.js';
import { deleteUserStart, deleteUserFailure, deleteUserSuccess } from '../redux/Slice/userSlice.js';
import { Modal } from "flowbite-react"
import { ModalBody, ModalHeader } from "flowbite-react"
import { HiOutlineExclamationCircle } from 'react-icons/hi'


const DashProfile = () => {
  const { currentUser, error: reduxError } = useSelector((state) => state.user); // ✅ renamed
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState(null); // ✅ renamed

  const filePickerRef = useRef();
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [showModel, setShowModel] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImageFileURL(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      if (password) formData.append('password', password);
      if (imageFile) formData.append('profilePicture', imageFile);

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Update failed');
      }

      dispatch(updateUserSuccess(data));
      setImageFileURL(null);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setLocalError('Failed to update profile'); // ✅ use localError
    } finally {
      setUploading(false);
    }
  };

  const getProfileImageSrc = () => {
    if (imageFileURL) return imageFileURL;
    if (!currentUser.profilePicture) return '/default-avatar.png';
    return currentUser.profilePicture.startsWith('data:image')
      ? currentUser.profilePicture
      : `data:image/jpeg;base64,${currentUser.profilePicture}`;
  };

  const handleDeleteUser = async () => {
    setShowModel(false);

    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleImageChange}
          ref={filePickerRef}
          className="hidden"
        />

        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={getProfileImageSrc()}
            alt="profile preview"
            className="rounded-full w-full h-full object-cover border-8 border-gray-400"
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password (leave blank to keep current)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          className="border-5 border-purple-700"
          outline
          disabled={uploading}
        >
          {uploading ? 'Updating...' : 'Update'}
        </Button>
      </form>

      {localError && <p className="text-red-500 mt-3">{localError}</p>}

      {reduxError && <p className="text-red-500 mt-3">{reduxError}</p>}

      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModel(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span className="cursor-pointer">Sign Out</span>
      </div>





      <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md">

//         <ModalHeader />
//         <ModalBody>
//           <div className='text-center'>
//             <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
//             <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete Account ?</h3>
//             <div className='flex justify-center gap-4'>
//               <Button color='red' onClick={handleDeleteUser}>Yes, I'm</Button>
//               <Button color="gray" onClick={() => setShowModel(false)}>No, cancel</Button>
//             </div>
//           </div>
//         </ModalBody>
//       </Modal>
    </div>
  );
};

export default DashProfile;
