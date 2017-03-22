/**
 * 批量订购界面
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookUpload } from '../../components';
import { xhttp, url } from '../../../common';
import { uploadCategorySelect, uploadChangeStep } from '../../actions';
import { initialize } from 'redux-form';

class bookUploadPage extends React.Component {
    componentWillMount() {
        let { xhttp, changeStep } = this.props;
        changeStep('category');
        xhttp.list('category');
    }

    render() {
        return (<BookUpload onSubmit={this.save.bind(this)} {...this.props} upload={this.upload.bind(this)} download={this.download.bind(this)}></BookUpload>);
    }

    download() {
        let { book_upload_category, xhttp, entities } = this.props;
        xhttp.download('category_template', [book_upload_category.join(',')], {},
            { name: book_upload_category.map(id => entities[id].name).join('_') + '.xlsx' });
    }

    upload(e) {
        let { book_upload_category, xhttp, entities, changeStep, initialize } = this.props;

        xhttp.upload('category_template', [book_upload_category.join(',')], { file: e.target.files[0] }).then(result => {
            let { data: orders } = result;

            let newData = { description: '', products: [] };

            Object.keys(orders).map(category_id => {
                orders[category_id].forEach(product => {
                    newData.products.push({
                        name: product.name,
                        code: product.code,
                        num: product.num,
                        unit_price: product.unit_price,
                        category: category_id,
                        attrs: Object.assign({}, ...entities[category_id].attrs.filter((item, index) => index > 3).map(attr => ({ [attr.key]: product[attr.key] })))
                    });
                });
            });

            initialize('book_confirm', newData);

            changeStep('confirm');

        });
    }

    save(value) {
        let { xhttp, history } = this.props;
        xhttp.create('order', [], value).then(result => {
            history.push('/order/' + result.order_id);
        });
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        xhttp: xhttp(dispatch),
        categorySelect: bindActionCreators(uploadCategorySelect, dispatch),
        changeStep: bindActionCreators(uploadChangeStep, dispatch),
        initialize: bindActionCreators(initialize, dispatch)
    };
}

export const BookUploadPage = connect(mapStateToProps, mapDispatchToProps)(bookUploadPage);
