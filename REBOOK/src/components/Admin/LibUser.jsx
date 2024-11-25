import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaSave, FaTimes, FaUser } from 'react-icons/fa';
import { useAuth } from '../../utils/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const User = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    profile: ''
  });
  const [editingField, setEditingField] = useState("");
  const [tempDetails, setTempDetails] = useState({});
  const [image, setImage] = useState("/rebook-images/default_profile.png");
  const [image2, setImage2] = useState("/rebook-images/default_editprofile.png");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/v1/user/details", {
          method: "GET",
          headers: {
            "Authorization": token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const result = await response.json();

        if (result.status === 422) {
          throw new Error(result.message);
        }

        setUserDetails({
          name: result.name || '',
          email: result.email || '',
          contact: result.contacts || '',
          password: '',
          confirmPassword: '',
          profile: result.profile || ''
        });

        if (result.profile) {
          setImage(`/api/v1/file/${result.profile}`);
        }
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user details:', err);
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleEditClick = (field) => {
    setEditingField(field);
    setTempDetails(userDetails);
  };

  const handleSave = async () => {
    try {
      setError("");
      
      // Password validation
      if (editingField.includes('password')) {
          if (!userDetails.password) {
              throw new Error("Password is required");
          }
          if (userDetails.password !== userDetails.confirmPassword) {
              throw new Error("Passwords don't match");
          }
      }

      // First upload image if there is one
      let profileResult = null;
      if (imageFile) {
          const profile = new FormData();
          profile.append("file", imageFile);
          
          const profileResponse = await fetch('/api/v1/file', {
              method: "POST",
              body: profile
          });
          
          if (!profileResponse.ok) {
              throw new Error('Failed to upload profile image');
          }
          
          profileResult = await profileResponse.json();
      }

      // Prepare update data
      const updateData = {
          name: userDetails.name,
          email: userDetails.email,
          contacts: userDetails.contact
      };

      // Only include password if it's being updated
      if (editingField.includes('password')) {
          updateData.password = userDetails.password;
      }

      // Only include profile if we have a new one
      if (profileResult) {
          updateData.profile = profileResult.data.fileName;
      }

      const userResponse = await fetch('/api/v1/user', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          },
          body: JSON.stringify(updateData)
      });

      const result = await userResponse.json();
      console.log(result);

      if (!userResponse.ok) {
          throw new Error(result.message || 'Failed to update user details');
      }

      setEditingField("");
    } catch (err) {
        setError(err.message);
        console.error('Error saving user details:', err);
        // Revert changes on error
        setUserDetails(tempDetails);
    }
  };

  const handleCancel = () => {
    if (editingField) {
      setUserDetails(tempDetails);
      setEditingField("");
      setError(null);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        setError('Image size must be less than 5MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Please use JPG, PNG or GIF');
        return;
      }

      const newImage = URL.createObjectURL(file);
      setImage(newImage);
      setImageFile(file);
      setError(null);
    }
  };

  return (
    <div className="bg-teal-100 p-6 w-full flex justify-left h-screen items-start">
      {error && (
        <div className="absolute top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="flex space-y- user">
        <div className="flex-shrink-0 text-center">
          <div className="bg-white p-10 rounded-3xl shadow-md mr-3" style={{ width: '300px', height: '350px' }}>
            <div className="relative flex justify-center items-center h-48">
              {image ? (
                <img
                  src={image}
                  alt="User"
                  className="w-48 h-48 rounded-full object-cover"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-48 h-48 text-gray-400"
                />
              )}
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 mb-2 mr-2 cursor-pointer"
              >
                <img
                  src={image2}
                  alt="Edit User"
                  className="w-12 h-12 rounded-full"
                />
              </label>
            </div>
            <h1 className="text-black text-xl mb-6 pt-3" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span className="font-bold">{userDetails.name}</span>
            </h1>
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
        <div className="flex bg-white p-10 rounded-3xl shadow-md w-full space-x-6 h-full">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-4">Account Settings</h2>
            <h3 className="text-lg font-semibold mb-4">Reader Information</h3>
            
            {/* Name field */}
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1">Name</h2>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder={userDetails.name}
                  value={editingField === "name" ? userDetails.name : ""}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full"
                  disabled={editingField !== "name"}
                />
                {editingField !== "name" && (
                  <FaPencilAlt 
                    onClick={() => handleEditClick("name")} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                  />
                )}
              </div>
            </div>

            {/* Email field */}
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1">Email</h2>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder={userDetails.email}
                  value={editingField === "email" ? userDetails.email : ""}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full"
                  disabled={editingField !== "email"}
                />
                {editingField !== "email" && (
                  <FaPencilAlt 
                    onClick={() => handleEditClick("email")} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                  />
                )}
              </div>
            </div>

            {/* Contact field */}
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-1">Contact</h2>
              <div className="relative">
                <input
                  type="text"
                  name="contact"
                  placeholder={userDetails.contact}
                  value={editingField === "contact" ? userDetails.contact : ""}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full"
                  disabled={editingField !== "contact"}
                />
                {editingField !== "contact" && (
                  <FaPencilAlt 
                    onClick={() => handleEditClick("contact")} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                  />
                )}
              </div>
            </div>

            {/* Password fields */}
            <div className="flex mb-4 space-x-4">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">Password</h2>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="**********"
                    value={editingField === "password" ? userDetails.password : ""}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full"
                    disabled={editingField !== "password"}
                  />
                  {editingField !== "password" && (
                    <FaPencilAlt 
                      onClick={() => handleEditClick("password")} 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">Confirm Password</h2>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="**********"
                    value={editingField === "password" ? userDetails.confirmPassword : ""}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full"
                    disabled={editingField !== "password"}
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCancel}
                className="bg-[#73C5C0] text-black px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center space-x-2"
              >
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="bg-[#73C5C0] text-black px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              >
                <FaSave />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;