/**
 * 确认订单界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookConfirmComponent } from '../../components';

class bookConfirmPage extends React.Component {
    render() {
        return (<BookConfirmComponent {...this.props}></BookConfirmComponent>);
    }

    // 下单
    saveOrder() {
        let { xhttp, book, entities, category, history, formData } = this.props, { selectProduct } = book;

        let newData = { description: formData.description, products: [] };

        newData.products = Object.keys(selectProduct).map(product_id => {
            let product = entities[product_id];
            return {
                name: product.name,
                code: product.code,
                num: selectProduct[product_id],
                unit_price: product.unit_price,
                category: product.category._id,
                attrs: Object.assign({}, ...product.category.attrs.filter((item, index) => index > 3).map(attr => ({ [attr.key]: product.attrs[attr.key] })))
            }
        });

        xhttp.create('order', [], newData).then(result => {
            history.pushState(null, '/order/' + result.order_id);
        });
    }

}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {};
}

export const BookConfirmPage = connect(mapStateToProps, mapDispatchToProps)(bookConfirmPage);