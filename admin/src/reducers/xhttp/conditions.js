/**
 * xhttp conditions reducer
 */
import apis from '../../config/api.json';

let XhttpConditionsReducers = {};

for (let api in apis) {
    XhttpConditionsReducers[api] = (state = {}, actions) => {
        return state;
    }
}

export default XhttpConditionsReducers;