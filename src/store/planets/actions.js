import swapi from '@api/swapi';

export function getAllPlanets(ctx) {
    return swapi.getAllPlanets().then((response) => {
        console.log(response);
    }).catch((err) => {
        console.error(err);
    });
}
