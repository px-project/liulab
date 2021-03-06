/**
 * 产品详情界面
 */
import React from 'react';
import { CategoryCover } from '../../../common';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './style.scss';

export const ProductDetail = ({ productDetail }) => (
    <div className="product-detail">
        <div className="page-header">
            <Link className="ui button red" to="/">返回</Link>
        </div>
    </div>
);


// export class ProductDetailComponent extends Component {
//     componentWillMount() {
//         let { xhttp, params } = this.props;
//         xhttp.detail('product', [params.product_id], () => {

//         });
//     }
//     render() {
//         let { params, entities, history } = this.props;
//         let { product_id } = params;
//         return (
//             <div className="product-detail-page">
//                 { entities[product_id] ? (
//                     <div className="page">
//                         <div className="page-header">
//                             <button className="ui button red" onClick={ history.goBack.bind(this) }>返回</button>
//                         </div>
//                         <div className="basic sec">
//                             <CategoryCover className="photo" category_id={ entities[product_id].category._id }></CategoryCover>
//                             <div className="info">
//                                 <h4 className="name">{ entities[product_id].name }</h4>
//                                 <p className="code">No. { entities[product_id].code }</p>
//                                 <p className="unit_price map">
//                                     <span className="title">单价</span>
//                                     <span className="value">{ window.accounting.formatMoney(entities[product_id].unit_price / 100, '￥') }</span>
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="detail sec"></div>
//                     </div>
//                 ) : (
//                         <div>加载中</div>
//                     ) }
//             </div>
//         );
//     }
// }