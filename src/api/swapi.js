import axios from 'axios';
const swapi = axios.create({
    baseURL : process.env.API_URL,
    headers: { 'Accept': 'application/json' },
});

swapi.interceptors.response.use(response => {
    if (response.status != 200) throw `${response.status} ${response.statusText}`
    else return response.data
}, error => {
    console.error(`[Status ${response.status}]:`, { error });
    return Promise.reject(error);
});

const endPoints = {
    getPlanets: `planets`,
};

export default {
    getAllPlanets: () => swapi.get(endPoints.getPlanets),
    getPlanetByID: (id) => swapi.get(`${endPoints.getPlanets}/${id}`),
    getPlanetByName: (name) => swapi.get(`${endPoints.getPlanets}/?search=${name}`),
};
