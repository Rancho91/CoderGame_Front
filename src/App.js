import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from './component/Home/home'
import NavBar from "./component/NavBar/navBar";
import Videogames from "./component/Videogames/videogames";
import CreateGameForm from "./component/CreateGameForm/CreateGameForm";
import 'bootstrap/dist/css/bootstrap.min.css'
import Detail from "./component/Home/detail/detaild";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {postUser} from "./redux/actions/actions"

function App() {
  const {isAuthenticated,user}=useAuth0()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(isAuthenticated){
      const {sub,name,email} = user
      dispatch(postUser({sub,name,email}))
    }
  })
  return (
      <div class="fondo">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creategame" element={<CreateGameForm />} />
          <Route path="/videogames" element={<Videogames />} />
          <Route path="/videogames/:id" element={<Detail/>}/> 
        </Routes>
      </div>
  );
}

export default App;

