import React from "react";
import { useEffect, useState } from "react";
import  Card  from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { all } from "axios";
import { getAllVideogames, query, orderBy, pagination } from "../../redux/actions/actions";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./videogames.module.css"


function Videogames (){
    const dispatch = useDispatch()
    const {Videogames, pages} = useSelector((state)=>state.allVideogames)
    const pageGlobal = useSelector((state)=>state.page)
    const [refresh, setRefresh] = useState(true)
    const [page, setPage] = useState(pageGlobal)
    const [order, setOrder] = useState({})
    const {user, isAuthenticated} = useAuth0()
    const [pageButton, setpageButton] =useState([])

    let queryState =useSelector((state)=>{
       if(isAuthenticated){

      return {...state.query, page:pageGlobal, sub:user.sub,...order}
    } else{

      return {...state.query, page:pageGlobal, ...order}
    }})

    const refreshHandler = () =>{
      setRefresh(!refresh)
    }
    const orderByHandler=(event)=>{

      setOrder({order:event.target.name, ascDesc:event.target.value})
    }      

    const renderButtons = () =>{
        let paginas = []
        if(pages<6) {
          for (let i = 1; i <= pages; i++) {
            paginas.push(i);
            
          }
        }else if (pageGlobal <= 3) {
          for (let i = 1; i <= 5; i++) {
            paginas.push(i);
          }
        } else if (pageGlobal <= pages - 2) {
          for (let i = pageGlobal - 2; i <= pageGlobal+2; i++) {
            paginas.push(i);
          }
        } else{
          for (let i = pages - 5; i <= pages; i++) {
            paginas.push(i);
          }
        }
        setpageButton(paginas)
      }

const handlerFilter=(event)=>{
  if(event.target.value === "previous"){
    dispatch(pagination(pageGlobal-1))} 
  else if(event.target.value === "next") {pagination(pageGlobal+1)}
  else{dispatch(pagination(Number(event.target.value)))}
  }
useEffect(()=>{
  const get = ()=>{
     dispatch(getAllVideogames(queryState))
     
  }
  renderButtons()
  get()
  return(()=>{})
},[refresh,pageGlobal,  order])


    return(


      <div className={`container justify-content-center ${styles.videogames}`}>
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
      <div className=" col-6 col-md-3">
        
          <Card game={game} refreshHandler={refreshHandler}/>
    
      </div>
    ))
  ) : (
    <div className="col-12">Loading</div>
  )}

  </div>
  <div className="row justify-content-center">
  <div className={`col-md-12 d-flex justify-content-center `}>
  {pageGlobal === 1 || pages < 6 ?  null : (
  <button onClick={handlerFilter} value="previous">{"<"}</button>
) }
    
      {pages ? (
        pageButton.map((pageNumb) => {
          return (
            <button  name="page" value={pageNumb} onClick={handlerFilter} className={pageNumb==pageGlobal?styles.selectedButton:styles.pageButton}>
              {pageNumb}
            </button>
          );
        })
      ) : null}
      {pageGlobal == pages || pages<6? (null):(<button onClick={handlerFilter} value="next"> {">"} </button>)}
      
    </div>
  </div>
</div>

    )}

export default Videogames