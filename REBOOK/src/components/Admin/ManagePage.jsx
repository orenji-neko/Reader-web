import { useCallback, useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { FaUpload, FaTrashAlt, FaImage } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/AuthProvider';
<<<<<<< HEAD
=======
import { useParams, useNavigate } from 'react-router-dom';
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56

const ImageInput = ({ onAddImage, image }) => {
    const max = 1;

    const onChange = (imageList) => {
        // Update parent component with the new image
        onAddImage(imageList[0]);
    };

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Upload Image</h2>
                <ImageUploading
                    value={image ? [image] : []}
                    onChange={onChange}
                    maxNumber={max}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        isDragging,
                        dragProps,
                    }) => (
                        <div className="flex flex-col items-center">
                            {imageList.length === 0 ? (
                                <FaImage className="text-gray-300 text-6xl mb-4" />
                            ) : (
                                <div className="relative w-32 h-32 m-2 border rounded-lg">
                                    <img src={imageList[0]['data_url']} alt="" className="object-cover w-full h-full rounded-lg" />
                                </div>
                            )}
                            <div className="flex space-x-4 mt-4">
                                <button
                                    className={`p-2 text-white rounded-lg ${isDragging ? 'bg-red-500' : 'bg-blue-500'}`}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    <FaUpload />
                                </button>
                                <button
                                    className="p-2 text-white bg-red-500 rounded-lg"
                                    onClick={onImageRemoveAll}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    )}
                </ImageUploading>
            </div>
        </div>
    );
};

ImageInput.propTypes = {
    onAddImage: PropTypes.func.isRequired,
    image: PropTypes.object
};

const ManagePage = () => {
<<<<<<< HEAD
=======
  const { bookId } = useParams();

>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(undefined);

<<<<<<< HEAD
  const [authorId, setAuthorId] = useState();
  const [categoryId, setCategoryId] = useState();
=======
  const [authorId, setAuthorId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);

  const [available, setAvailable] = useState(0);
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56

  const [categoriesData, setCategoriesData] = useState([]);
  const [authorsData, setAuthorsData] = useState([]);

  const { token } = useAuth();
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56

  // Fetch authors and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch("/api/v1/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          }
        });
        const categories = await categoryResponse.json();
        setCategoriesData(categories);  

        const authorsResponse = await fetch("/api/v1/authors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          }
        });
        const authors = await authorsResponse.json();
        setAuthorsData(authors);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

<<<<<<< HEAD
    fetchData();
  }, [token]);

  const uploadHandler = useCallback(() => {

    const upload = async () => {
=======
    const fetchBook = async () => {
      try {
        const bookResponse = await fetch(`/api/v1/book/${bookId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          }
        });
        const bookResult = await bookResponse.json();
        setTitle(bookResult.title);
        setAuthorId(bookResult.authorId);
        setCategoryId(bookResult.categoryId);
        setDescription(bookResult.description);
        setAvailable(bookResult.available);

        // Convert cover URL to file
        const coverFile = await urlToFile(`/api/v1/file/${bookResult.cover}`, bookResult.cover, 'image/jpeg');
        setCover({ data_url: `/api/v1/file/${bookResult.cover}`, file: coverFile });
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    }

    fetchData();
    if (bookId) {
      fetchBook();
    }
  }, [bookId, token]);

  const uploadHandler = useCallback(() => {
    const upload = async (opt) => {
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56
      const formData = new FormData();
      formData.append('title', title);
      formData.append('authorId', authorId);
      formData.append('categoryId', categoryId);
      formData.append('description', description);
<<<<<<< HEAD
      formData.append('cover', cover.file);

      try {
        const response = await fetch("/api/v1/book", {
          method: "POST",
          headers: {
            "Authorization": token
          },
          body: formData
        });

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Failed to upload book", error);
      }
    };

    upload();
  }, [title, authorId, description, categoryId, cover, token]);

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <h1 className="text-2xl font-bold p-2">Add Book</h1>
=======
      formData.append('available', available);
      if (cover && cover.file) {
        formData.append('cover', cover.file);
      }
  
      if(opt === "EDIT") {
        formData.append("id", bookId);
      }
  
      try {
        const response = await fetch("/api/v1/book", {
          method: opt === "EDIT" ? "PUT" : "POST",
          headers: {
            "Authorization": `${token}`
          },
          body: formData
        });
  
        if (!response.ok) {
          const errorDetail = await response.json();
          throw new Error(errorDetail.message || "Failed to upload book");
        }
  
        const result = await response.json();
        alert("Uploaded Book");
        navigate("/librarian/inventory");
      } catch (error) {
        alert("Failed to upload book: " + error.message);
        console.log(error);
      }
    };
  
    upload(bookId ? "EDIT" : "ADD");
  }, [bookId, title, authorId, categoryId, description, available, cover, token, navigate]);

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <h1 className="text-2xl font-bold p-2">{bookId ? 'Edit Book' : 'Add Book'}</h1>
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56
      <div className="bg-teal-300 rounded-md p-6 flex flex-col h-full">
        <div className="flex flex-row justify-evenly h-full">
          <div className="h-full w-full flex flex-col space-y-4 p-4">
            <input 
              className="w-full p-2 rounded-lg" 
              type="text" 
              placeholder="Title" 
              onChange={(e) => setTitle(e.target.value)} 
              value={title}
            />
            <select
              className="w-full p-2 rounded-lg"
              onChange={(e) => setAuthorId(e.target.value)}
<<<<<<< HEAD
            >
              <option value="" disabled>Select Author</option>
=======
              value={authorId}
            >
              <option value={-1} disabled>Select Author</option>
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56
              {authorsData && authorsData.length > 0 && authorsData.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
            <select
              className="w-full p-2 rounded-lg"
              onChange={(e) => setCategoryId(e.target.value)}
<<<<<<< HEAD
            >
              <option value="" disabled>Select Category</option>
=======
              value={categoryId}
            >
              <option value={-1} disabled>Select Category</option>
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56
              {categoriesData && categoriesData.length > 0 && categoriesData.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
<<<<<<< HEAD
=======
            <input 
              className="w-full p-2 rounded-lg" 
              type="number" 
              placeholder="Available" 
              onChange={(e) => setAvailable(parseInt(e.target.value))} 
              value={available}
            />
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56
            <textarea
              className="w-full p-2 rounded-lg h-40" 
              placeholder="Description" 
              onChange={(e) => setDescription(e.target.value)} 
              value={description}
            />
          </div>
          <div className="h-full w-full flex flex-col">
            <ImageInput max={1} image={cover} onAddImage={setCover} />
          </div>
        </div>
        <div className="flex flex-row justify-end space-x-2 mt-4">
          <button
            className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-200 hover:text-black"
<<<<<<< HEAD
            onClick={() => {}}
=======
            onClick={() => { navigate("/librarian/inventory") }}
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56
          >
            Cancel
          </button>
          <button
            className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-200 hover:text-black"
            onClick={uploadHandler}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePage;
<<<<<<< HEAD
=======

const urlToFile = async (url, filename, mimeType) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};
>>>>>>> e591aa5518e29dcb8b9d5fb06907874bf4808c56
