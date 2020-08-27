import swapi from '@api/swapi';
import { actTypes, mutTypes } from './types';

export default {
    [actTypes.GET_ALL_PLANETS]: async ({ dispatch }) => {
        // SWAPI doesn't provide us sorting feature and searching by anything except name
        // but we need that, SO we gonna fetch EVERYTHING!
        try {
            let response = await swapi.getPlanets()
            dispatch(actTypes.PROCESS_PAGE, { response })
            let { count, results } = response;
            let numOfPages = Math.ceil(count / results.length);
            if (numOfPages > 1) {
                let fetches = [];
                for (let page = 2; page < numOfPages + 1; page++)
                    fetches.push[
                        swapi.getPlanets(page).then(response => dispatch(actTypes.PROCESS_PAGE, { response }))
                    ];
                Promise.all(fetches)
            }
        } catch(error) {
            console.error(error);
        }
    },
    [actTypes.PROCESS_PAGE]: ({ commit, state }, payload) => {
        let results = payload.response.results;
        if (!results || !Array.isArray(results))
            return Promise.reject("Incorrect 'results' field in response");
        commit(mutTypes.SET_PLANETS_LIST, [...state.planetsList, ...results]);
    },

}
