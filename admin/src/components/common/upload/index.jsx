/**
 * 上传图片组件
 */
import React, { Component } from 'react';
import defaultPic from '../../../public/images/default.png';
import classname from 'classname';
import './style.scss';

export class UploadComponent extends Component {

    render() {
        let {circle, formData, className} = this.props;
        return (
            <div className={'l-upload ' + className + classname({ circle })}>
                <a>
                    <img src={formData.upload_image || defaultPic} />
                    <i className="fa fa-upload"></i>
                    <input ref="fileupload" type="file" onChange={this.upload.bind(this)} />
                </a>
            </div>
        );
    }

    upload(e) {
        let {xhttp, xform} = this.props;
        let reqData = new FormData();
        reqData.append('file', e.target.files[0]);

        xhttp.upload('resource', [], reqData).then(result => xform.change('upload_image', result.filepath));
    }
}