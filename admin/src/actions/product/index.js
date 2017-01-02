/**
 * 产品模块action
 */
import * as consts from '../../constants/';


// 生成选择模板id action
function selectTemplateIdAction(template_id) {
    return {
        type: consts.SELECT_TEMPLATE_ID,
        template_id
    };
}



// 选择template_id
export function selectTemplateId(template_id) {
    return (dispatch) => dispatch(selectTemplateIdAction(template_id));
}
