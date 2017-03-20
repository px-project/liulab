/**
 * 选择商品下单的确认界面
 */
import React from 'react';
import { currency } from '../../../../utils';
import classname from 'classname';
import { Image } from '../../../common';
import { reduxForm, FieldArray } from 'redux-form';
import './style.scss';
import { Form, Table, TableCell, TableHeader, TableRow, TableHeaderCell, TableFooter, TableBody, ButtonGroup, Button } from 'semantic-ui-react';


const Products = ({ fields }) => (
	<TableBody>
		{fields.map((field, index) => (
			<TableRow key={index}>
				<TableCell>{index + 1}</TableCell>
				<TableCell>{field.name}</TableCell>
				<TableCell>{field.code}</TableCell>
				<TableCell>{field.unit_price}</TableCell>
				<TableCell>{field.num}</TableCell>
				<TableCell>{field.unit_price * field.num}</TableCell>
			</TableRow>
		))}
	</TableBody>
);

@reduxForm({ form: 'book_confirm' })
export class BookConfirm extends React.Component {
	render() {
		let { handleSubmit } = this.props;
		return (
			<Form className="book-confirm" onSubmit={handleSubmit}>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderCell>序号</TableHeaderCell>
							<TableHeaderCell>产品</TableHeaderCell>
							<TableHeaderCell>编号</TableHeaderCell>
							<TableHeaderCell>单价</TableHeaderCell>
							<TableHeaderCell>数量</TableHeaderCell>
							<TableHeaderCell>合计</TableHeaderCell>
							<TableHeaderCell>操作</TableHeaderCell>
						</TableRow>
					</TableHeader>
					<FieldArray name="products" component={Products}></FieldArray>
				</Table>

				<ButtonGroup>
					<Button primary={true}>确认订单</Button>
				</ButtonGroup>
			</Form>
		);
	}
}