import { GET_PLATFORMS, GET_GENRES, POST_USER, USER_LOGOUT } from "../actions/actionsTypes";




const initialState = {
  allGenres: [],
  allPlatforms: [],
  userRole:{}
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
        case POST_USER:
          return {...state, userRole:action.payload};
        case USER_LOGOUT:
          return {...state, userRole:action.payload}
        
            
        default:
                return state;
        
    }

}