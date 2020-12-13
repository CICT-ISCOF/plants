import React, { Component, createRef, RefObject } from 'react';
import { PlantitoVariety } from '../../../services/contracts';

interface Props {
	index: number;
	variety: PlantitoVariety;
	setVariety: (variety: PlantitoVariety, index: number) => void;
	getVariety: (index: number) => PlantitoVariety;
	removeVariety: (index: number) => void;
	processing: boolean;
}

export default class Variety extends Component<Props> {
	fileRef = createRef<HTMLInputElement>();

	render() {
		const {
			variety,
			index,
			setVariety,
			getVariety,
			removeVariety,
		} = this.props;
		return (
			<div className='form-group'>
				<div className='text-center mb-3'>
					<input
						type='file'
						name=''
						ref={this.fileRef}
						id=''
						className='d-none'
						onChange={(e) => {
							e.preventDefault();
							if (e.target.files) {
								const reader = new FileReader();
								reader.onload = (event) => {
									variety.photo_url = String(
										event.target?.result
									);
									setVariety(variety, index);
								};
								reader.readAsDataURL(e.target.files[0]);
							}
						}}
					/>
					<img
						src={variety.photo_url}
						alt=''
						className='img-fluid clickable'
						onClick={(e) => {
							e.preventDefault();
							this.fileRef.current?.click();
						}}
					/>
				</div>
				<label htmlFor='name'>Name:</label>
				<input
					type='text'
					placeholder={`Variety ${index + 1} Title`}
					className={`form-control form-control-sm mb-3 ${
						this.props.processing ? 'disabled' : ''
					}`}
					disabled={this.props.processing}
					value={variety.name}
					onChange={(e) => {
						e.preventDefault();
						const variety = getVariety(index);
						variety.name = e.target.value;
						setVariety(variety, index);
					}}
					id={`variety-name-${index}`}
				/>
				<button
					className='btn btn-danger btn-sm'
					onClick={(e) => {
						e.preventDefault();
						removeVariety(index);
					}}
				>
					Remove
				</button>
			</div>
		);
	}
}
