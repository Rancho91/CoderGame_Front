import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "./subnavbar.module.css"

const SubNavBar = () =>{
    return (
        <div className={style.navbar}>
            <nav>
                <div className={style.navbar__2}>
                    <SearchBar />
                </div>

                
            </nav>
        </div>
    )
}

export default SubNavBar;