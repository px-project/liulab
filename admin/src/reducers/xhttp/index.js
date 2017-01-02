/**
 * xhttp reducer total
 */
import XhttpItemsReducers from './items';
import XhttpFetchingReducers from './fetching';
import XhttpConditionsReducers from './conditions';
import apis from '../../config/api.json';

let xhttp = {};

for (let api in apis) {
    xhttp[api] = {
        items: XhttpItemsReducers[api],
        fetching: XhttpFetchingReducers[api],
        conditions: XhttpConditionsReducers[api]
    };
}

export default xhttp;
