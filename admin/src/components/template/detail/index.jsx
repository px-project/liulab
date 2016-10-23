/**
 * 模板详情
 */
import React, { Component } from 'react';
import './style.scss';

export class TemplateDetailComponent extends Component {
	componentWillMount() {
		let {xhttp, params} = this.props;
		let {template_id} = params;
		this.getTemplateDetail(xhttp, template_id);
	}

	render() {
		let {entities, params} = this.props;
		let {template_id} = params;
		let templateData = entities[template_id];

		return (
			<div className="template-detail">
				{templateData ? (
					<div>
						<h3>{templateData.name}</h3>
						{templateData.template.length && templateData.template.map((field, field_index) => (
							<div key={field_index}>{field.key} ({field.title})</div>
						))}
					</div>
				) : ''}
			</div>
		);
	}

	// 获取模板详情
	getTemplateDetail(xhttp, template_id) {
		xhttp({ action: 'detail', api: 'template', params: [template_id] });
	}
}
