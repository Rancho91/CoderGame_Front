import axios from "axios";

import { GET_GENRES, GET_PLATFORMS } from './actionsTypes';


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

