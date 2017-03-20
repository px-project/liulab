/**
 * 上传界面
 */
import React, { Component } from 'react';
import classname from 'classname';
import { BookUploadCategory as Category, BookUploadTemplate as Template } from '..';
import { BookConfirm as Confirm } from '../../confirm';
import { StepGroup, Step } from 'semantic-ui-react';
import { BOOK_UPLOAD_STEPS } from '../../../constants';
import './style.scss';

function getStepLocal(target, current) {
	let currentIndex = 0, targetIndex = 0;
	BOOK_UPLOAD_STEPS.forEach((s, i) => {
		if (s.status === target) targetIndex = i;
		if (s.status === current) currentIndex = i;
	});
	return currentIndex - targetIndex;
}


export const BookUpload = props => (
	<div className="book-upload-page page">
		<StepGroup ordered>
			{BOOK_UPLOAD_STEPS.map((step, index) => (
				<Step title={step.name} description={step.description} key={index}
					active={!getStepLocal(step.status, props.book_upload_step)}
					disabled={getStepLocal(step.status, props.book_upload_step) < 0}
				></Step>
			))}
		</StepGroup>
		<div className="step-cont">
			{props.book_upload_step === 'category' && <Category {...props}></Category>}
			{props.book_upload_step === 'template' && <Template {...props}></Template>}
			{props.book_upload_step === 'confirm' && <Confirm handleSubmit={props.handleSubmit}></Confirm>}
		</div>
	</div>
);