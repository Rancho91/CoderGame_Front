import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from './component/Home/home'
import NavBar from "./component/NavBar/navBar";
import Videogames from "./component/Videogames/videogames";
import CreateGameForm from "./component/CreateGameForm/CreateGameForm";
import 'bootstrap/dist/css/bootstrap.min.css'
import Detail from "./component/Home/detail/detaild";

function App() {
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

