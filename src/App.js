import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import {postUser, getGenresFilter, getPlatformsFilter} from "./redux/actions/actions"
import Home from './component/Home/home'
import NavBar from "./component/NavBar/navBar";
import Videogames from "./component/Videogames/videogames";
import CreateGameForm from "./component/CreateGameForm/CreateGameForm";
import Detail from "./component/Home/detail/detaild";
import Favorites from "./component/Favorites/favorites"
import Profile from "./component/Profile/Profile";
import SubNavBar from "./component/SubNavBar/SubNavBar";
import CoinBuyer from "./component/CoinBuyer/CoinBuyer";
import PaymentSuccess from "../src/component/CoinBuyer/PaymentSuccess"
import PaymentFailure from "../src/component/CoinBuyer/PaymentFailure"

function App() {
  const {isAuthenticated,user}=useAuth0()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(isAuthenticated){
      console.log('post user')
      const {sub,name,email} = user
       dispatch(postUser({sub,name,email}))
    }
    dispatch(getGenresFilter())
    dispatch(getPlatformsFilter())

  })
  return (
      <div class="fondo">
        <NavBar />
        <div className="container ">
           <SubNavBar/>
        </div>
       
        <Routes>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/creategame" element={<CreateGameForm />} />
          <Route path="/videogames" element={<Videogames />} />
          <Route path="/videogames/:id" element={<Detail />}/> 
          <Route path="/profile" element={<Profile />}/>
          <Route path="/payment" element={<CoinBuyer />}/>
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure />}/>
        </Routes>
      </div>
  );
}

export default App;

