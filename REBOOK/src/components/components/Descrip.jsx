import React from 'react';

const Descrip = () => {
    return (
        <div className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-full" style={{ marginTop: '10px', marginLeft: '-280px', marginBottom: '45px', marginTop: '25px', }}>
            <div className="bg-black bg-opacity-50 p-4 rounded-lg flex flex-col lg:flex-row justify-between items-start"> {/* Gray container with 50% opacity */}
                <div className="flex flex-col justify-center items-left space-y-2" style={{ maxWidth: '874px' }}>
                    <h1 className="text-3xl font-extrabold text-red-100">ReBook: Revolutionizing Libraries</h1>
                    <h1 className="text-2xl text-red-100">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReBook is a modern system that simplifies borrowing, returning, and managing books in libraries.
                        It offers an intuitive platform for users to explore collections, manage accounts, and enjoy a seamless library experience.
                    </h1>
                </div>
            </div>
            <div className="flex justify-center mt-4 lg:mt-0 lg:ml-4 lg:absolute lg:right-0" style={{ marginRight: '80px' }}>
                <iframe width="460" height="215" src="https://www.youtube.com/embed/JYghqEPdNoo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
    );
}

export default Descrip;
