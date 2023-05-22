import React from "react";
import { Link } from "react-router-dom";
import Home from "../Home/home";
import Login from "./login/login"
import styles from "./navBar.module.css"
import SearchBar from "../SearchBar/SearchBar";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./logaut/logaut"

function NavBar (){
    const {isAuthenticated} = useAuth0()
    return (
        <nav>
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center" >
                    <div className="col-3">
                        <img
                         src="https://cdn.discordapp.com/attachments/509143549787504665/1096068638957649962/CoderGame.png"
                         alt="codergame"
                         width="250px"
                         height="70px"
                        />
                    </div>
                <div className={`col-9 ${styles.container} d-flex align-items-center justify-content-center`}>
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-5">
                            <SearchBar/>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-center">
                            <div className="row d-flex align-items-center justify-content-center">
                            <div className="col-3">
                                <Link to={'/'} className="btn btn-outline-danger"> Home</Link>

                            </div>
                            <div className="col-3">
                                <Link to={"/videogames"} className="btn btn-outline-danger">
                                🎮 ALL Games
                                </Link>    
                            </div>
                             <div className="col-3">
                                {isAuthenticated?<Logout/>:<Login rute="http://localhost:3000/"/> }  
                             </div>
                             <div className="col-3">
                                <Link to="/favorites"> favorites</Link>
                             </div>
                            </div>
                            
                   
                        </div>
                       
                    </div>

                </div>   
                </div>
                     
            </div>
        </nav>

    )
}


export default NavBar