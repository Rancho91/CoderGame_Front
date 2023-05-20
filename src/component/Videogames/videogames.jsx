import React from "react";
import { useEffect, useState } from "react";
import fetchData from "../Home/helper/fetchData";
import  Card  from "../card/card";
import SearchBar from "../SearchBar/SearchBar"

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
    console.log(filter)



    return(
      <div>
        <SearchBar handlerFilter={handlerFilter}/>
      <div className="container justify-content-center">
        <div className="container d-flex justify-content-start">
          <div className="row justify-content-center">
          {allVideogames ? (
    allVideogames.map((game) => (
      <div className="col-4">
        
          <Card game={game} />
    
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
            <button onClick={handlerFilter} name="page" value={page}>
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