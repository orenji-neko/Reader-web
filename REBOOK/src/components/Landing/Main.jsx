
import Slogan from "../components/Slogan";
import Descrip from "../components/Descrip";
import Best from "../components/Best";
import PropTypes from "prop-types";
import Abouts from "../components/Abouts";

const Main = ({ active = "" }) => {
    return (
        <main className="flex flex-col justify-center items-center h-full">
            {
                (() => {
                    if(active) {
                        
                    }
                    else {
                        return (
                            <>
                                <div className="">
                                    <Slogan/>
                                </div>
                                <div className="">
                                    <Descrip/>
                                </div>
                                <div className="w-full">
                                    <Best/>
                                </div>
                                <div className="w-full">
                                    <Abouts/>
                                    
                                </div>

                            </>
                        )
                    }
                })()
            }
        </main>
    )
}
Main.propTypes = {
    active: PropTypes.string
}

export default Main;
