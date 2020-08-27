import { mutTypes } from './types';

export default {
    [mutTypes.SET_PLANETS_LIST]: (state, newPlanetsList) => {
        state.planetsList = [...newPlanetsList];
    },
}
