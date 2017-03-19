/**
 * 上传方式选择界面
 */
import React from 'react';
import { CategoryItem } from '../item';
import { ButtonGroup, Button } from 'semantic-ui-react';
import { Loader } from '../../../../../common';
import './style.scss';

export const BookUploadCategory = props => (
	<Loader className="upload-category" loading={props.category.fetching.list}>
		<div className="category-list">
			{props.category.items.map((category_id, category_index) => (
				<CategoryItem category_id={category_id} {...props} key={category_index}></CategoryItem>
			))}
		</div>
		<ButtonGroup>
			<Button disabled={!props.book_upload_category.length} primary={true}
				onClick={props.changeStep.bind(this, 'template')}>继续</Button>
		</ButtonGroup>
	</Loader>
);