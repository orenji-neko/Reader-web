import {} from 'react';
import {} from 'react-router-dom';
import {} from 'react-icons/fa';;

const ManagePage = () => {

    return (
        <div className="flex flex-col w-full h-full min-h-screen">
            <h1 className="text-lg">Add Book</h1>
        <div className="bg-teal-100 p-6 flex flex-col">
        <div className="flex flex-row justify-evenly">
            <div className="h-auto w-full flex flex-col justify-between bg-red-100">
                <input className="w-auto p-2 rounded-lg" type="text" placeholder="Title" />
                <input className="w-auto p-2 rounded-lg" type="text" placeholder="Title" />
            </div>
            <div className="h-auto w-full">
                Picture Here
            </div>
        </div>
        </div>
        </div>
    );
};

export default ManagePage;