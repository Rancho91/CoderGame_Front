import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "./subnavbar.module.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../../redux/actions/actions";

const SubNavBar = ({handlerFilter}) =>{
    
    const dispatch = useDispatch()
    const genresList = useSelector((state)=>state.genresFilter)
    const platformsList = useSelector((state)=>state.platformsFilter)

 
      const change = (e)=>{
        handlerFilter(e)
      }

    return (
        <div className={style.navbar}>
            <nav>
                <div className={style.navbar__2}>
                </div>

                <select id="mySelect" name="genre" onChange={change}>
        {
          genresList?.map((genre)=>{
            return(
              <option value={genre.name} id={genre.id}>{genre.name}</option>
            )
          })
        }
                </select>
            <select id="mySelect" name="platforms" onChange={change}>
            {
                platformsList?.map((platform)=>{
                    return(
                    <option value={platform.name} id={platform.id}>{platform.name}</option>
                    )
                 })
         }
            </select>
            </nav>
        </div>
    )
}

export default SubNavBar;