import React from "react";
import { useEffect, useState } from "react";
import fetchData from "../Home/helper/fetchData";
import  Card  from "../card/card";

function Videogames (){
    const [allVideogames, setAllVideogames]= useState([])
    const [pages, setPages] = useState(0)
    const [filter, setFilter] = useState({})
    

    useEffect(() => {
        const data = async () => {
            try {
                const {Videogames, pages} = await fetchData('http://localhost:3001/videogames', 'get',filter);
                setAllVideogames(Videogames);
                setPages(pages)

            } catch (error) {
                window.alert('not found videogames')
            }
        };
    
        data();
      }, [filter, pages]);

      const renderButtons = () =>{
        let paginas = []
        for(let i=1; i< pages;i++){
            paginas.push(i)
        }
        return paginas
      }
      
      const handlerFilter=(event)=>{
        setFilter({...filter, [event.target.name]:event.target.value})
      }
    console.log(allVideogames)
    return(
        <div>
            <div className="container">

           
            {allVideogames?(allVideogames.map((game)=>{
                return(
                    <Card game={game}/>
            )
            })):'Loading'}
        </div>
            {pages?(renderButtons().map((page)=>{
                return(<button onClick={handlerFilter} name="page" value={page}>{page}</button>)
            })):null}
        </div>
    )
}

export default Videogames