import axios from "axios";
import { ORDEN_NAMES, PAGINATION, ORDER_BY, QUERY, GET_ALL_VIDEOGAMES, GET_GENRES_FILTER, GET_PLATFORMS_FILTER, GET_GENRES, GET_PLATFORMS, POST_USER, USER_LOGOUT } from './actionsTypes';
import { api } from '../../App'


export const getGenresFilter = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("genres/filter");
      console.log(api)
      dispatch({ type: GET_GENRES_FILTER, payload: response.data });
    } catch (error) {
      return window.alert("No se pudo hacer el pedido de géneros al servidor");
    }
  };
};

export const pagination = (page)=>{
  return{type:PAGINATION , payload:page}
}

export const getAllVideogames = (query) =>{

  return async (dispatch) =>{
    try {
      const {data} = await api.get("videogames", {params: query})
      console.log(query)
      dispatch ({type:GET_ALL_VIDEOGAMES, payload:data})
    } catch (error) {
      window.alert(error.message)
    }
  }
}

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("genres");
      dispatch({ type: GET_GENRES, payload: response.data });
    } catch (error) {
      return window.alert("No se pudo hacer el pedido de géneros al servidor");
    }
  };
};

export const getPlatformsFilter = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("platforms/filter");
      dispatch({ type: GET_PLATFORMS_FILTER, payload: response.data });
    } catch (error) {
      return window.alert("No se pudo hacer el pedido de plataformas al servidor");
    }
  };
};


export const getPlatforms = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("platforms");
      dispatch({ type: GET_PLATFORMS, payload: response.data });
    } catch (error) {
      return window.alert("No se pudo hacer el pedido de plataformas al servidor");
    }
  };
};

export const postUser = (body) =>{
  return async (dispatch)=>{
    try {
     const user=  await api.post("user/register", body);
     dispatch({ type: POST_USER, payload: user.data })
    } catch (error) {
      window.alert(error.message)
    }
  } 
}

export const userLogout = () =>{
  return {type: USER_LOGOUT, payload:{}}

}

export const postGame = (payload, token) => {
  return async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const info = await api.post(
      "videogames",
      payload,
      config
    );
    return info;
  };
};

export const query=(query)=>{
  return {type:QUERY, payload:query}
} 

export const orderBy=(order)=>{
return {type:ORDEN_NAMES, payload:order}
}