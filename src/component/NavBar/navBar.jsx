import React from "react";
import { Link } from "react-router-dom";
import Home from "../Home/home";

function NavBar (){


    return (
        <nav>
            <div>
                <img
                src="https://cdn.discordapp.com/attachments/509143549787504665/1096068638957649962/CoderGame.png"
                alt="codergame"
                width="250px"
                height="70px"
                />
                <div>
                    <Link to={'/'} className="btn btn-outline-danger"> Home</Link>
                    <Link to={"/videogames"} className="btn btn-outline-danger">
                    🎮 ALL Games
                     </Link>    
                </div>        
            </div>
        </nav>

    )
}


export default NavBar