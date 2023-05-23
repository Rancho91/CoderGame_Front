import React from "react";
import { useEffect, useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import style from "./subnavbar.module.css"
import {  useSelector, useDispatch } from "react-redux";
import Login from "../NavBar/login/login";
import Logout from "../NavBar/logaut/logaut";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { getAllVideogames } from "../../redux/actions/actions";


const SubNavBar = ({handlerFilter}) =>{
    const{isAuthenticated} = useAuth0()
    const genresList = useSelector((state)=>state.genresFilter)
    const platformsList = useSelector((state)=>state.platformsFilter)
    const [filter, setFilter] = useState({})

    const dispatch = useDispatch()

      const change = (event)=>{
        setFilter({...filter, [event.target.name]:event.target.value})
      }
      useEffect(()=>{
        const get = () =>{
          dispatch(getAllVideogames(filter))
        }
        get()
      },[filter])

    return (
        <div className={style.navbar}>
            <nav>
                <div className={style.navbar__2}>
                </div>

                <select id="mySelect" name="genre" onChange={change}>
                <option value="">genres</option>
        {
          genresList?.map((genre)=>{
            
            return(
             <option value={genre.name} id={genre.id}><Link to="/videogames">{genre.name}</Link></option> 
            )
          })
        }
                </select>
            <select id="mySelect" name="platforms" onChange={change}>
            <option value="">platforms</option>

            {
                platformsList?.map((platform)=>{
                    return(
                    <option value={platform.name} id={platform.id}>{platform.name}</option>
                    )
                 })
         }
            </select>
            <div className="col-3">
              {isAuthenticated?<Logout/>:<Login rute="http://localhost:3000/"/> }  
            </div>
            </nav>
        </div>
    )
}

export default SubNavBar;