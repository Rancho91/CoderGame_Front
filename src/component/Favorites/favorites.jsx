import React, { useEffect,useState } from "react";
import axios from "axios";
import Card from "../card/card";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../NavBar/login/login"
function Favorites (){
    const [listFavorites, setListFavorites]= useState([])
    const {user, isAuthenticated, loginWithRedirect} = useAuth0()


    useEffect(()=>{
        const getFavorites = async () =>{
            if(isAuthenticated){
                try {       
                        const response = await axios.get(`http://localhost:3001/user/favorites/${user?.sub}`)
                        setListFavorites(response.data.listFavorites)
                                    }
  
                 catch (error) {
                 window.alert(error.message)   
        }}
        }
         getFavorites()
    },[])
console.log(listFavorites)
    return(
        <div className="row">
            {listFavorites?.map((game)=>{
               return( 
               <div className="col-3">
                <Card game={game}></Card>

               </div>
            )})}
         <div>
            {isAuthenticated?null:<Login rute="http://localhost:3000/favorites"/>}
         </div>
        </div>
    )
}

export default Favorites