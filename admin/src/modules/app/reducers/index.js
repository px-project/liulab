/**
 * app reducer.
 */
import { combineReducers } from 'redux';
import { XhttpReducer, EntityReducer } from '../../common/reducers';
import * as reducers from '../../reducers';
import { XHTTP_API } from '../../common/constants';
import { reducer as formReducer } from 'redux-form';

export const AppReducer = combineReducers(Object.assign(
    {
        form: formReducer,
        entities: EntityReducer
    },
    ...Object.keys(XHTTP_API).map(api => ({ [api]: XhttpReducer(api) })),
    ...Object.keys(reducers).map(field => ({ [field]: reducers[field] }))
));