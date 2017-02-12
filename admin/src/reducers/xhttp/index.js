/**
 * xhttp reducer total
 */
import apis from '../../config/api.json';
import { XhttpItemsReducers } from './items';
import { XhttpFetchingReducers } from './fetching';
import { XhttpConditionsReducers } from './conditions';
import { XhttpDetailReducers } from './detail';

export let XhttpReducers = {};

Object.keys(apis).map(api => {
    XhttpReducers[api] = {
        items: XhttpItemsReducers[api],
        fetching: XhttpFetchingReducers[api],
        conditions: XhttpConditionsReducers[api],
        detail: XhttpDetailReducers[api]
    };
});
