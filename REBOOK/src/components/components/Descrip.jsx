import React from 'react';
const Descrip = () => {
    return (
        <div className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-full" style={{ marginTop: '90px', marginLeft: '-280px' }}>
            <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg"> {/* Gray container with 50% opacity */}
                <div className="flex flex-col justify-center items-left space-y-2" style={{ maxWidth: '874px' }}>
                    <h1 className="text-3xl font-extrabold text-red-100">ReBook: Revolutionizing Libraries</h1>
                    <h1 className="text-2xl text-red-100">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReBook is a modern system that simplifies borrowing, returning, and managing books in libraries. 
                        It offers an intuitive platform for users to explore collections, manage accounts, and enjoy a seamless library experience.
                    </h1>
                </div>
            </div>
        </div>
    )
}
export default Descrip;
