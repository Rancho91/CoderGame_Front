import axios from "axios";

import { GET_BY_NAME } from './actionsTypes';

export const getGameByName = (payload) => {
    return {
      type: GET_BY_NAME,
      payload,
    };
  };

  