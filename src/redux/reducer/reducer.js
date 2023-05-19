import { GET_PLATFORMS, GET_GENRES } from "../actions/actionsTypes";




const initialState = {
  allGenres: [],
  allPlatforms: [],

}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_GENRES:
            return {
              ...state,
              allGenres: [...action.payload],
            };
      
        case GET_PLATFORMS:
            return {
              ...state,
              allPlatforms: [...action.payload],
            };
            
        default:
                return state;
        
    }

}