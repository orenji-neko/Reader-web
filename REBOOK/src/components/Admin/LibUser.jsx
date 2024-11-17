// LibUser.jsx

import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaSave, FaTimes, FaUser } from 'react-icons/fa';

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
                <FaUser className="w-48 h-48 text-gray-400" />
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
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <h1 className="text-lg font-semibold text-black mt-4">Hello, {userDetails.name}</h1>
            <p className="text-sm text-gray-500">{userDetails.email}</p>
          </div>
        </div>
        <div className="flex-grow p-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="mb-4">
              <label className="text-gray-600">Name</label>
              <div className="flex items-center">
                {editingField === "name" ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={userDetails.name}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-64"
                    />
                    <button onClick={handleSave} className="ml-2 text-green-500">
                      <FaSave />
                    </button>
                    <button onClick={handleCancel} className="ml-2 text-red-500">
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-semibold">{userDetails.name}</span>
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => handleEditClick("name")}
                    >
                      <FaPencilAlt />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-gray-600">Email</label>
              <div className="flex items-center">
                {editingField === "email" ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-64"
                    />
                    <button onClick={handleSave} className="ml-2 text-green-500">
                      <FaSave />
                    </button>
                    <button onClick={handleCancel} className="ml-2 text-red-500">
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{userDetails.email}</span>
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => handleEditClick("email")}
                    >
                      <FaPencilAlt />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-gray-600">Contact</label>
              <div className="flex items-center">
                {editingField === "contact" ? (
                  <>
                    <input
                      type="text"
                      name="contact"
                      value={userDetails.contact}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-64"
                    />
                    <button onClick={handleSave} className="ml-2 text-green-500">
                      <FaSave />
                    </button>
                    <button onClick={handleCancel} className="ml-2 text-red-500">
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{userDetails.contact}</span>
                    <button
                      className="ml-2 text-blue-500"
                      onClick={() => handleEditClick("contact")}
                    >
                      <FaPencilAlt />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibUser;
