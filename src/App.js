import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home/Home";

function App() {
  return (
      <div class="fondo">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;

