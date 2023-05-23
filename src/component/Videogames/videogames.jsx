import React from "react";
import { useEffect, useState } from "react";
import  Card  from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import SubNavBar from "../SubNavBar/SubNavBar";
import { all } from "axios";
import { getAllVideogames } from "../../redux/actions/actions";
import { useAuth0 } from "@auth0/auth0-react";


function Videogames (){
    const dispatch = useDispatch()
    const {Videogames, pages} = useSelector((state)=>state.allVideogames)
    const [refresh, setRefresh] = useState(true)
    const [page, setPage] = useState(1)
    const {user, isAuthenticated} = useAuth0()
    let query =useSelector((state)=>{
       if(isAuthenticated){
      return {...state.query, page, sub:user.sub}
    } else{
      return {...state.query, page}
    }})
    const refreshHandler = () =>{
      console.log(refresh)
      setRefresh(!refresh)
    }

      const renderButtons = () =>{
        let paginas = []
        for(let i=1; i< pages;i++){
            paginas.push(i)
        }
        return paginas
      }

      const handlerFilter=(event)=>{
          setPage(event.target.value)
          
        }
useEffect(()=>{
  const get = ()=>{
     dispatch(getAllVideogames(query))
  }
  get()
},[page, refresh])


    return(
      
      <div>
        <SubNavBar handlerFilter={handlerFilter}/>
      <div className="container justify-content-center">
        <div className="container d-flex justify-content-start">
          <div className="row justify-content-center">
          {Videogames ? (
    Videogames.map((game) => (
      <div className="col-4">
        
          <Card game={game} refreshHandler={refreshHandler}/>
    
      </div>
    ))
  ) : (
    <div className="col-12">Loading</div>
  )}
    </div>
  </div>
  <div className="row justify-content-center">
  <div className="col-md-12 d-flex justify-content-center">
      {pages ? (
        renderButtons().map((page) => {
          return (
            <button  name="page" value={page} onClick={handlerFilter}>
              {page}
            </button>
          );
        })
      ) : null}
    </div>
  </div>
</div>
</div>
    )
}

export default Videogames