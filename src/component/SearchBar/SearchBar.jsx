import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ handlerFilter }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlerFilter(e); 
  };

  return (
    <div>
      <input type="text" className="btn btn-dark" placeholder="What game are you looking for?" onChange={handleInput} />
      <button type="submit" name="name" value={name} className="btn btn-secondary" onClick={handleSubmit}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBar;
