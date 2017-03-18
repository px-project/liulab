/**
 * upload image.
 */
import React from 'react';
import Dropzone from 'react-dropzone';
import classname from 'classname';
import './style.scss';
import defaultIamge from '../../../../public/images/default.png';
import { Icon } from '..';

export class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: defaultIamge
        }
    }

    onDrop(files) {
        this.setState({ file: files[0] });
    }

    onOpenClick() {
        this.refs.dropzone.open();
    }

    render() {
        let { className } = this.props;
        let { file } = this.state;

        return (
            <div className={`l-upload-Image ${className}`}>
                <Dropzone className="l-upload-dropzone" ref="dropzone" onDrop={this.onDrop.bind(this)} multiple={false}>
                    <img src={file.preview || file} />
                    <Icon icon="upload"></Icon>
                </Dropzone>
            </div>
        );
    }
}