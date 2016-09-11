/**
 * 上传界面
 */
import React, {Component} from 'react';
import {Table} from 'antd';

export class UploadComponent extends Component {

	uploadOrderExcel (xhttp, e) {
		let file = e.target.files[0];
		let reqData = new FormData();
		reqData.append('file', file);
		reqData.append('type', 'xlsx');
		xhttp({
			action: 'create',
			api: 'resource',
			reload: true,
			data: reqData
		});
	}

	componentWillReceiveProps (nextProps) {
	}


    render () {
    	console.log(this.props.resource.items[0]);
        return (
            <div>
            	<div>
					<input type="file" onChange={this.uploadOrderExcel.bind(this, this.props.xhttp)}/>
            	</div>

            	{
        		this.props.resource.items[0]
    			? (
					<div>
						{
						this.props.resource.items[0].data.map((data) => {
							let columns = {

							};
							return (
								<Table columns={columns} dataSources={data} title={() => {data.product_type}}></Table>
							);
						})
						}
					</div>
    			) : ''
            	}
            </div>
        );
    }
}
