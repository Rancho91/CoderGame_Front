import { PAGINATION, ORDEN_NAMES,GET_ALL_VIDEOGAMES ,GET_GENRES_FILTER, GET_PLATFORMS_FILTER, GET_GENRES, GET_PLATFORMS, POST_USER, USER_LOGOUT, QUERY, ORDER_BY } from '../actions/actionsTypes';




const initialState = {
  allGenres: [],
  allPlatforms: [],
  userRole:{},
  genresFilter:[],
  platformsFilter: [],
  allVideogames: [],
  query:{},
  page:1,
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
          return {...state, userRole:action.payload};
        case GET_GENRES_FILTER:
          return{...state, genresFilter:action.payload };
        case GET_PLATFORMS_FILTER:
          return{...state, platformsFilter:action.payload};
          case GET_ALL_VIDEOGAMES:
            return{...state, allVideogames:action.payload};
          case QUERY:
            return{...state, query: action.payload};
            case PAGINATION:
              return{...state, page:action.payload};
           
        default:
                return state;
        
    }

}