import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaSave, FaTimes, FaUser } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the solid user icon

const LibUser = () => {
  const [userDetails, setUserDetails] = useState({
    name: "Nicki",
    email: "Gwapakoe@gmail.com",
    contact: "09123456789",
    password: "12345678910",
    confirmpassword: "12345678910"
  });
  const [editingField, setEditingField] = useState("");
  const [tempDetails, setTempDetails] = useState({});
  const [image, setImage] = useState("/rebook-images/default_profile.png");
  const [image2, setImage2] = useState("/rebook-images/default_editprofile.png");

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
    const storedImage = localStorage.getItem("userImage");
    if (storedImage) {
      setImage(storedImage);
    } else {
      setImage("/rebook-images/default_profile.png");
    }
  }, []);

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

  const handleSave = () => {
    setEditingField("");
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("userImage", image);
    window.location.reload(); // Refreshes the page after saving
  };

  const handleCancel = () => {
    if (editingField) {
      setUserDetails(tempDetails);
      setEditingField("");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      setImage(newImage);
    }
  };

  return (
    <div className="bg-teal-100 p-6 w-full flex justify-left h-screen items-start">
      <div className="flex space-y- user">
        <div className="flex-shrink-0 text-center">
          <div className="bg-white p-10 rounded-3xl shadow-md mr-3" style={{ width: '300px', height: '350px' }}>
            <div className="relative flex justify-center items-center h-48">
              {image ? (
                <img
                  src={image}
                  alt="User"
                  className="w-48 h-48 rounded-full"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser} // Use Font Awesome user icon if no image is present
                  className="w-48 h-48 text-gray-400" // Adjust styles as needed
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
            <h1 className="text-black text-5xl mb-6 pt-3" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                  <FaPencilAlt onClick={() => handleEditClick("name")} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                )}
              </div>
            </div>
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
                  <FaPencilAlt onClick={() => handleEditClick("email")} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                )}
              </div>
            </div>
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
                  <FaPencilAlt onClick={() => handleEditClick("contact")} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                )}
              </div>
            </div>
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
                    <FaPencilAlt onClick={() => handleEditClick("password")} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">Confirm Password</h2>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmpassword"
                    placeholder="**********"
                    value={editingField === "confirmpassword" ? userDetails.confirmpassword : ""}
                    onChange={handleChange}
                    className="p-2 border rounded-lg w-full"
                    disabled={editingField !== "confirmpassword"}
                  />
                  {editingField !== "confirmpassword" && (
                    <FaPencilAlt onClick={() => handleEditClick("confirmpassword")} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                  )}
                </div>
              </div>
            </div>
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

export default LibUser;
