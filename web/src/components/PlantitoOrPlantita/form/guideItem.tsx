import React, { Component } from 'react';
import { PlantitoGuideItem } from '../../../services/contracts';

interface Props {
	index: number;
	processing: boolean;
	getItem: (index: number) => PlantitoGuideItem;
	setItem: (item: PlantitoGuideItem, index: number) => void;
	removeItem: (index: number) => void;
	item: PlantitoGuideItem;
	guideIndex: number;
}

export default class GuideItem extends Component<Props> {
	render() {
		const {
			index,
			item,
			guideIndex,
			getItem,
			setItem,
			removeItem,
		} = this.props;
		return (
			<div
				className='py-2 px-3 shadow border rounded bg-white m-2'
				key={index}
			>
				<div className='form-group'>
					<input
						type='text'
						placeholder={`Guide ${guideIndex + 1} Item ${
							index + 1
						} Title`}
						className={`form-control form-control-sm mb-3 ${
							this.props.processing ? 'disabled' : ''
						}`}
						disabled={this.props.processing}
						value={item.title}
						onChange={(e) => {
							e.preventDefault();
							const item = getItem(index);
							item.title = e.target.value;
							setItem(item, index);
						}}
						id={`guide-item-title-${index}`}
					/>
					<textarea
						name={`guide-item-description-${index}`}
						placeholder={`Guide ${guideIndex + 1} Item ${
							index + 1
						} Description`}
						className={`form-control form-control-sm mb-3 ${
							this.props.processing ? 'disabled' : ''
						}`}
						disabled={this.props.processing}
						value={item.description}
						onChange={(e) => {
							e.preventDefault();
							const item = getItem(index);
							item.description = e.target.value;
							setItem(item, index);
						}}
						id={`guide-item-description-${index}`}
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
