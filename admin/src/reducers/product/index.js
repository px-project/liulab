/**
 * 产品界面reducer
 */
import * as consts from '../../constants/';
import { combineReducers } from 'redux';


function selectTemplateId(state = '', action) {
    switch (action.type) {
        case consts.SELECT_TEMPLATE_ID:
            return action.template_id;

        default:
            return state;
    }
}

const ProductReducers = combineReducers({
    template_id: selectTemplateId
});

export default ProductReducers;
