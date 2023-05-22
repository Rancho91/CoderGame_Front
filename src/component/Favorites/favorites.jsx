import React, { useEffect,useState } from "react";
import axios from "axios";
import Card from "../card/card";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../NavBar/login/login"
function Favorites (){
    const [listFavorites, setListFavorites]= useState([])
    const {user, isAuthenticated, loginWithRedirect} = useAuth0()
    const [login, setLogin] = useState(false)


    useEffect(()=>{
        const getFavorites = async () =>{
            if(login){
                try {       
                        const {data} = axios.get(`http://localhost:3001/user/favorites/${user?.sub}`)
                        setListFavorites(data)
                                    }
  
                 catch (error) {
                 window.alert(error.message)   
        }}else{
            console.log(login)
           if(!login){
                loginWithRedirect();
                setLogin(true)
           }
 
        }
        }
        // getFavorites()
    },[])

    return(
        <div>
            {listFavorites?.map((game)=>{
                <Card game={game}></Card>
            })}
         <div>
            {isAuthenticated?null:<Login rute="http://localhost:3000/favorites"/>}
         </div>
        </div>
    )
}

export default Favorites