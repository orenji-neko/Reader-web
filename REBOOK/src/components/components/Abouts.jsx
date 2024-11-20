import React from 'react';
import background from "../assets/background_2.png";

const Abouts = () => {
    return (
        <div id="aboutus-section" // Add ID for smooth scroll
            className="flex flex-col w-full" 
            style={{ 
                backgroundImage: `linear-gradient(rgba(0, 100, 0, 0.3), rgba(0, 100, 0, 0.3)), url(${background})`,
                minHeight: '100vh', // Ensure it covers the entire viewport height
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top',
                backgroundSize: 'cover', // Ensures the background image covers the entire area
                fontFamily: 'Times New Roman, Times, serif' // Set font to Times New Roman
            }} 
        >
            <div className="flex flex-col justify-center items-center space-y-6 mx-auto" style={{ maxWidth: '1180px' }}>
                <div className="text-center">
                    <h1 className="text-5xl text-red-100" style={{ marginTop: '30px', marginBottom: '34px' }}>About Us</h1>
                </div>
                <h1 className="text-2xl text-white text-justify">At ReBook, we believe in the transformative power of books. 
                    Our mission is to provide an easy-to-use digital library that connects readers with a vast collection of titles. 
                    Join us in promoting literacy and a love for reading!</h1>
            </div>
            <div className="flex flex-col justify-center items-center space-y-6 mx-auto" style={{ maxWidth: '1180px' }}>
                <div className="text-center">
                    <h1 className="text-4xl text-red-100" style={{ marginTop: '16px', marginBottom: '5px' }}>Our Mission & Values</h1>
                </div>
                <h1 className="text-2xl text-white text-justify">We strive to create a space where learning and curiosity come alive. 
                    Whether it’s through a diverse collection of books or engaging community programs, our mission is to inspire, educate, and connect people from all walks of life.</h1>
            </div>
            <div className="flex flex-col justify-center items-center space-y-6 mx-auto" style={{ maxWidth: '1200px' }}>
                <div className="text-center">
                    <h1 className="text-5xl text-red-100" style={{ marginTop: '30px', marginBottom: '34px' }}>Our Team</h1>
                </div>
                <div className="flex justify-center space-x-16">
                    <div className="flex flex-col items-center">
                        <img src="/src/assets/icons/Projectmanager.png" alt="Project Manager" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                        <p className="text-center text-white">Project Manager</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-64">
                    <div className="flex flex-col items-center">
                        <img src="/src/assets/icons/Leadprogrammer.png" alt="Lead Programmer" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                        <p className="text-center text-white">Lead Programmer</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/src/assets/icons/Leaduiux.png" alt="Lead UI/UX" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                        <p className="text-center text-white">Lead UI/UX</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-24" style={{ marginBottom: '300px' }}>
                    <div className="flex flex-col items-center">
                        <img src="/src/assets/icons/Backend.png" alt="Back-End" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                        <p className="text-center text-white">Back-End</p>
                        <div className="flex space-x-4">
                            <div className="flex flex-col items-center">
                                <img src="/src/assets/icons/Helper.png" alt="Helper (Back-End)" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                                <p className="text-center text-white">Helper (Back-End)</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                    <img src="/src/assets/icons/Frontend.png" alt="Front-End" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                    <p className="text-center text-white">Back-End</p>
                        <div className="flex space-x-4">
                        <div className="flex flex-col items-center">
                                <img src="/src/assets/icons/Helper2.png" alt="Helper 2 (Front-End)" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                                <p className="text-center text-white">Helper (Front-End)</p>
                            </div>
                        </div>
                    
                        <div className="flex space-x-4">
                        <div className="flex flex-col items-center">
                                <img src="/src/assets/icons/Ui.png" alt="UI" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                                <p className="text-center text-white">UI</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img src="/src/assets/icons/Ui2.png" alt="UI 2" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                                <p className="text-center text-white">UI</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex flex-col items-center">
                                <img src="/src/assets/icons/Ux.png" alt="UX" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                                <p className="text-center text-white">UX</p>
                            </div>
                            
                        </div>
                        <div className="flex space-x-4">
                        <div className="flex flex-col items-center">
                                <img src="/src/assets/icons/Tester2.png" alt="Tester 2" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                                <p className="text-center text-white">Tester</p>
                            </div>
                        <div className="flex flex-col items-center">
                            <img src="/src/assets/icons/Tester.png" alt="Tester" className="h-24 w-24 rounded-full" /> {/* Made circular */}
                            <p className="text-center text-white">Tester</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Abouts;
