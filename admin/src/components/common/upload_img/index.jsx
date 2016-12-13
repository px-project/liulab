/**
 * 上传图片组件
 */
import React, { Component } from 'react';
import defaultPic from '../../../public/images/default.png';
import classname from 'classname';
import './style.scss';

export class UploadImgComponent extends Component {

    render() {
        let {filename, fileKey, circle} = this.props;
        return (
            <div className={classname({'upload-img': true, circle})}>
                <a>
                    <img src={filename ? `${window.server}/resource/${filename}` : defaultPic} />
                    <i className="fa fa-upload"></i>
                    <input ref="fileupload" type="file" onChange={this.upload.bind(this)} />
                </a>
            </div>
        );
    }

    upload(e) {
        let {xhttp, xform, fileKey} = this.props;
        let file = e.target.files[0];
        let reqData = new FormData();
        reqData.append('file', file);
        xhttp({
            action: 'create',
            api: 'resource',
            reload: true,
            data: reqData
        }, result => {
            xform(result.filename, fileKey);
        });
    }
}