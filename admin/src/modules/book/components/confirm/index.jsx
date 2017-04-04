/**
 * 选择商品下单的确认界面
 */
import React from 'react';
import { currency } from '../../../../utils';
import classname from 'classname';
import { Image } from '../../../common';
import { reduxForm, FieldArray, Field } from 'redux-form';
import './style.scss';
import { Form, Table, TableCell, TableHeader, TableRow, TableHeaderCell, TableFooter, TableBody, ButtonGroup, Button } from 'semantic-ui-react';

const Value = ({ input }) => (
	<p>{ input.value }</p>
);

const Products = ({ fields }) => (
	<TableBody>
		{ fields.map((field, index) => (
			<TableRow key={ index }>
				<TableCell>{ index + 1 }</TableCell>
				<TableCell>
					<Field name={ `${field}.name` } component={ Value }></Field>
				</TableCell>
				<TableCell>
					<Field name={ `${field}.code` } component={ Value }></Field>
				</TableCell>
				<TableCell>
					<Field name={ `${field}.unit_price` } component={ Value }></Field>
				</TableCell>
				<TableCell>
					<Field name={ `${field}.num` } component={ Value }></Field>
				</TableCell>
				<TableCell>{ field.unit_price * field.num }</TableCell>
				<TableCell></TableCell>
			</TableRow>
		)) }
	</TableBody>
);

@reduxForm({ form: 'book_confirm' })
export class BookConfirm extends React.Component {
	render() {
		let { handleSubmit } = this.props;
		return (
			<form className="book-confirm" onSubmit={ handleSubmit }>
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
					<FieldArray name="products" component={ Products }></FieldArray>
				</Table>

				<ButtonGroup>
					<Button primary={ true }>确认订单</Button>
				</ButtonGroup>
			</form>
		);
	}
}