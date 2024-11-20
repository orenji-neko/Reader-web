import headbar from "../assets/headbar.png";

const Slogan = () => {
    return (
        <div style={{ 
            backgroundImage: `linear-gradient(rgba(0, 100, 0, 0.3), rgba(0, 100, 0, 0.3)), url(${headbar})`,
            backgroundSize: 'cover',
            minWidth: '208vh',
            minHeight: '35vh',
            marginTop: '26px', // Ensure it covers the entire viewport height
            }} 
            className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-full">
            <div className="flex flex-col justify-center items-center space-y-2" style={{marginTop: '38px', marginLeft: '468px'}}>
                <div>
                <h1 className="text-5xl font-extrabold text-red-100">Reading Never Ends! </h1>
                <hr className="w-full border-t-2 border-white"/>
                </div>
                <p className="text-base text-white font-bold">"Explore Boundless Worlds. One Click at a Time!"</p>
            </div>
        </div>
    )
}

export default Slogan;
