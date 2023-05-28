import React from "react";
import { useEffect, useState } from "react";
import  Card  from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import SubNavBar from "../SubNavBar/SubNavBar";
import { all } from "axios";
import { getAllVideogames, query, orderBy } from "../../redux/actions/actions";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./videogames.module.css"

function Videogames (){
    const dispatch = useDispatch()
    const {Videogames, pages} = useSelector((state)=>state.allVideogames)
    const [refresh, setRefresh] = useState(true)
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({})
    const {user, isAuthenticated} = useAuth0()

    let queryState =useSelector((state)=>{
       if(isAuthenticated){

      return {...state.query, page, sub:user.sub,...order}
    } else{

      return {...state.query, page, ...order}
    }})

    const refreshHandler = () =>{
      setRefresh(!refresh)
    }
    console.log(queryState)
    const orderByHandler=(event)=>{

      setOrder({order:event.target.name, ascDesc:event.target.value})
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
     dispatch(getAllVideogames(queryState))
     
  }
  get()
},[page,refresh, order])


    return(
      
      <div>
        <SubNavBar handlerFilter={handlerFilter}/>

      <div className="container justify-content-center">
      <div className="row" >
        <div className="col-2">
            <button name="name" onClick={orderByHandler} value="asc" className={order?.order==="name"&&order?.ascDesc==="asc"?styles.selectedOrder:styles.orderButton}>A-Z</button>
        </div>
        <div className="col-2">
            <button name="name" onClick={orderByHandler} value="desc" className={order?.order==="name"&&order?.ascDesc==="desc"?styles.selectedOrder:styles.orderButton}>Z-A</button>
        </div>
        <div className="col-2">
            <button name="released" onClick={orderByHandler} value = "asc" className={order?.order==="released"&&order?.ascDesc==="asc"?styles.selectedOrder:styles.orderButton}>New</button>
        </div>
        <div className="col-2">
            <button name="released" onClick={orderByHandler} value="desc" className={order?.order==="released"&&order?.ascDesc==="desc"?styles.selectedOrder:styles.orderButton}> old</button>
        </div>
        <div className="col-2">
          <button name="price" onClick={orderByHandler} value="asc" className={order?.order==="price"&&order?.ascDesc==="asc"?styles.selectedOrder:styles.orderButton}>menor precio</button>
        </div>
        <div className="col-2">
          <button name="price" onClick={orderByHandler} value="desc" className={order?.order==="price"&&order?.ascDesc==="desc"?styles.selectedOrder:styles.orderButton}>mayor precio</button>
        </div>
            
            
        </div>
          <div className="row justify-content-center">
          {Videogames ? (
    Videogames.map((game) => (
      <div className="col-sm-12 col-md-3">
        
          <Card game={game} refreshHandler={refreshHandler}/>
    
      </div>
    ))
  ) : (
    <div className="col-12">Loading</div>
  )}

  </div>
  <div className="row justify-content-center">
  <div className={`col-md-12 d-flex justify-content-center `}>
      {pages ? (
        renderButtons().map((pageNumb) => {
          return (
            <button  name="page" value={pageNumb} onClick={handlerFilter} className={pageNumb==page?styles.selectedButton:styles.pageButton}>
              {pageNumb}
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