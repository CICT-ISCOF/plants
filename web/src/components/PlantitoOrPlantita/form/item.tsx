import React, { Component, RefObject } from 'react';
import { PlantitoItem } from '../../../services/contracts';

interface Props {
	index: number;
	promptItemFile: (index: number) => void;
	setItemFile: (file: File, index: number) => void;
	getItem: (index: number) => PlantitoItem;
	setItem: (item: PlantitoItem, index: number) => void;
	removeItem: (index: number) => void;
	item: PlantitoItem;
	fileRef: RefObject<HTMLInputElement>;
	processing: boolean;
}

export default class Item extends Component<Props> {
	render() {
		const {
			index,
			item,
			fileRef,
			setItem,
			setItemFile,
			getItem,
			removeItem,
			promptItemFile,
		} = this.props;
		return (
			<div className='py-2 px-3 shadow border rounded bg-white m-2'>
				<div className='form-group'>
					<h3 className='mt-3'>Item {index + 1}:</h3>
					<div className='text-center'>
						<img
							src={item.photo_url}
							alt=''
							className='img-fluid my-2 clickable'
							style={{
								maxHeight: '200px',
							}}
							onClick={(e) => {
								e.preventDefault();
								promptItemFile(index);
							}}
						/>
					</div>
					<input
						type='file'
						name={`item-file-${index}`}
						id={`item-file-${index}`}
						className='d-none'
						ref={fileRef}
						onChange={(e) => {
							e.preventDefault();
							if (e.target.files) {
								const file = e.target.files[0];
								setItemFile(file, index);
							}
						}}
					/>
					<textarea
						name={`item-body-${index}`}
						placeholder={`Body ${index + 1}`}
						className={`form-control form-control-sm mb-3 ${
							this.props.processing ? 'disabled' : ''
						}`}
						disabled={this.props.processing}
						value={item.body}
						onChange={(e) => {
							e.preventDefault();
							const item = getItem(index);
							item.body = e.target.value;
							setItem(item, index);
						}}
						id={`item-body-${index}`}
					/>
					<button
						className='btn btn-danger btn-sm'
						onClick={(e) => {
							e.preventDefault();
							removeItem(index);
						}}
					>
						Remove
					</button>
				</div>
			</div>
		);
	}
}
