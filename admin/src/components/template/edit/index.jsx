/**
 * 编辑模板
 */
import React, {Component} from 'react';
import './style.scss';

export class TemplateEditComponent extends Component {
	// 模板数据
	templateData = null;

	componentWillMount () {
		let {params, xhttp, entities} = this.props;
		let template_id = params.template_id;
		let templateData = this.templateData = entities[template_id];

		if (!templateData || !templateData.template) {
			xhttp({
				action: 'detail',
				api: 'template',
				params: [template_id]
			});
		}
	}

	render () {
		return (
			<div>

			</div>
		);
	}
}
