import Books from "./Books";
import Slogan from "../components/Slogan";
import PropTypes from "prop-types";
import AboutUs from "./AboutUs";

const Main = ({ active = "" }) => {
    return (
        <main className="flex flex-col justify-center items-center h-full">
            {
                (() => {
                    if(active) {
                        if(active === "books") {
                            return <Books/>
                        }
                        else if(active === "aboutus") {
                            return <AboutUs/>
                        }
                    }
                    else {
                        return (
                            <div className="">
                                <Slogan/>
                            </div>
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