import axios from "axios"

const fetchData = async (ruta, http, query, body) => {
    const response = await axios[http](ruta)
    return response.data
}

export default fetchData