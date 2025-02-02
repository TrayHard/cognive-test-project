import axios from 'axios';
const swapi = axios.create({
    baseURL : process.env.API_URL,
    headers: { 'Accept': 'application/json' },
    timeout: 5000,
});

swapi.interceptors.response.use(response => {
    if (response.status != 200) throw `${response.status} ${response.statusText}`
    else return response.data
}, error => {
    console.error(`[Status ${response.status}]:`, { error });
    throw error;
});

const endPoints = {
    getPlanets: `planets`,
};

export default {
    getPlanets: (page) => swapi.get(`${endPoints.getPlanets}/?page=${page ? page : 1}`),
    getPlanetByID: (id) => swapi.get(`${endPoints.getPlanets}/${id}`),
    getPlanetByName: (name) => swapi.get(`${endPoints.getPlanets}/?search=${name}`),
};
