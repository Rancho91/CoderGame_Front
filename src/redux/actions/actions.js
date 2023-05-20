import axios from "axios";
import fetchData from "../../component/Home/helper/fetchData"
import { GET_GENRES, GET_PLATFORMS, POST_USER, USER_LOGOUT } from './actionsTypes';


export const getGenres = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/genres");
      dispatch({ type: GET_GENRES, payload: response.data });
    } catch (error) {
      return window.alert("No se pudo hacer el pedido de géneros al servidor");
    }
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/platforms");
      dispatch({ type: GET_PLATFORMS, payload: response.data });
    } catch (error) {
      return window.alert("No se pudo hacer el pedido de plataformas al servidor");
    }
  };
};

export const postUser = (body) =>{
  return async (dispatch)=>{
    try {
     const user=  await axios.post("http://localhost:3001/user/register", body);
     dispatch({ type: POST_USER, payload: user.data })
    } catch (error) {
      window.alert(error.message)
    }
  } 
}

export const userLogout = () =>{
  return {type: USER_LOGOUT, payload:{}}

}