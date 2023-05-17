import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from './component/Home/home'
import NavBar from "./component/NavBar/navBar";
import Videogames from "./component/Videogames/videogames";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
      <div class="fondo">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videogames" element={<Videogames />} />
        </Routes>
      </div>
  );
}

export default App;

