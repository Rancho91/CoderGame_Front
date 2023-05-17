import {getGameByName} from '../../redux/actions/actions';

const { useState } = require("react");
const { useDispatch } = require("react-redux");


const SearchBar = () => {
    const dispatch  = useDispatch();
    const [name, setName] = useState('');

    const handleInput = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getGameByName(name)); 
    }
    
    return(
        <div>
            <input type="text" className="btn btn-dark" placeholder="Search" onChange={handleInput} />
            <button type="submit" className="btn btn-secondary" onClick={handleSubmit} >Search</button>
        </div>
    )

}

export default SearchBar;