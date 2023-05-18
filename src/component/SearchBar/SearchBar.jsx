import {getGameByName} from '../../redux/actions/actions';

const { useState } = require("react");
const { useDispatch } = require("react-redux");


const SearchBar = ({handlerFilter}) => {
    const dispatch  = useDispatch();
    const [name, setName] = useState('');

    const handleInput = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handlerFilter(e)
    }
    
    return(
        <div>
            <input type="text" className="btn btn-dark" placeholder="Search" onChange={handleInput} />
            <button type="submit" name="name" value={name} className="btn btn-secondary" onClick={handleSubmit} >Search</button>
        </div>
    )

}

export default SearchBar;