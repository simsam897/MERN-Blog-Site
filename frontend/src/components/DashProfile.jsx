// import React, { useRef, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { TextInput, Button } from 'flowbite-react'
// // import { updateUserSuccess } from '../redux/userSlice' // <- Uncomment if you have this action

// const DashProfile = () => {
//   const { currentUser } = useSelector((state) => state.user)
//   const dispatch = useDispatch()

//   const [imageFile, setImageFile] = useState(null)
//   const [imageFileURL, setImageFileURL] = useState(null)
//   const [uploading, setUploading] = useState(false)
//   const [error, setError] = useState(null)

//   const filePickerRef = useRef()
//   const [username, setUsername] = useState(currentUser.username)

//   const [email, setEmail] = useState(currentUser.email)
//   const [password, setPassword] = useState('')

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if (!file) return
//     setImageFile(file)
//     setImageFileURL(URL.createObjectURL(file)) // preview instantly
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null)
//     setUploading(true)

//     try {
//       const formData = new FormData()
//       formData.append("name", username)

//       formData.append("email", email)
//       if (password) formData.append("password", password)
//       if (imageFile) formData.append("profilePicture", imageFile) // multer field name must match

//       const res = await fetch(`/api/auth/update/${currentUser._id}`, {
//         method: "PUT",
//         Authorization: `${currentUser.token}`,
//         body: formData,
//       })

//       // if (!res.ok) throw new Error("Upload failed")
//       // const data = await res.json()


//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Upload failed"); // 👈 now you'll see backend error
//       }

//       // Update Redux user state if you have an action
//       // dispatch(updateUserSuccess(data.user))

//       console.log("Upload success:", data)
//       setUploading(false)
//       alert("Profile updated successfully!")

//     } catch (err) {
//       console.error(err)
//       setError("Failed to upload profile picture")
//       setUploading(false)
//     }
//   }

//   return (
//     <div className="max-w-lg mx-auto p-3 w-full">
//       <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

//       <form className="flex flex-col gap-4" method="post" onSubmit={handleSubmit}>
//         {/* Hidden file input */}
//         <input
//           type="file"

//           onChange={handleImageChange}
//           ref={filePickerRef}
//           className="hidden"
//         />

//         {/* Clickable avatar for selecting image */}
//         <div
//           className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full"
//           onClick={() => filePickerRef.current.click()}
//         >
//           <img
//             src={imageFileURL || currentUser.profilePicture}
//             alt="profile preview"
//             className="rounded-full w-full h-full object-cover border-8 border-gray-400"
//           />
//         </div>

//         <TextInput
//           type="text"
//           id="username"
//           placeholder="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextInput
//           type="text"
//           id="email"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextInput
//           type="password"
//           id="password"
//           placeholder="password (leave blank to keep current)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button
//           type="submit"
//           className="border-5 border-purple-700"
//           outline
//           disabled={uploading}
//         >
//           {uploading ? "Updating..." : "Update"}
//         </Button>
//       </form>

//       {error && <p className="text-red-500 mt-3">{error}</p>}

//       <div className="text-red-500 flex justify-between mt-5">
//         <span className="cursor-pointer">Delete Account</span>
//         <span className="cursor-pointer">Sign Out</span>
//       </div>
//     </div>
//   )
// }

// export default DashProfile




import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button } from 'flowbite-react';
import { updateUserSuccess } from '../redux/Slice/userSlice.js' // ✅ Make sure this is correctly imported

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const filePickerRef = useRef();
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImageFileURL(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      if (password) formData.append('password', password);
      if (imageFile) formData.append('profilePicture', imageFile);

      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Update failed');
      }

      dispatch(updateUserSuccess(data)); // ✅ Sync updated user to Redux
      setImageFileURL(null); // Clear preview after successful update
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
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

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;