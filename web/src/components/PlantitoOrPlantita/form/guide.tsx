import React, { Component } from 'react';
import { PlantitoGuide, PlantitoGuideItem } from '../../../services/contracts';
import GuideItem from './guideItem';

interface Props {
	index: number;
	getGuide: (index: number) => PlantitoGuide;
	setGuide: (guide: PlantitoGuide, index: number) => void;
	removeGuide: (index: number) => void;
	guide: PlantitoGuide;
	processing: boolean;
}

export default class Guide extends Component<Props> {
	addItem(item: PlantitoGuideItem) {
		const guide = this.props.guide;
		guide.items.push(item);
		this.props.setGuide(guide, this.props.index);
	}

	getItem(index: number) {
		const guide = this.props.guide;
		return guide.items[index];
	}

	setItem(item: PlantitoGuideItem, index: number) {
		const guide = this.props.guide;
		guide.items.splice(index, 1, item);
		this.props.setGuide(guide, this.props.index);
	}

	removeItem(index: number) {
		const guide = this.props.guide;
		guide.items.splice(index, 1);
		this.props.setGuide(guide, this.props.index);
	}

	render() {
		const { index, guide, getGuide, setGuide, removeGuide } = this.props;
		return (
			<div className='py-2 px-3 shadow border rounded bg-white m-2'>
				<div className='form-group'>
					<h3 className='mt-3'>Guide {index + 1}:</h3>
					<input
						type='text'
						placeholder={`Guide ${index + 1} Title`}
						className={`form-control form-control-sm mb-3 ${
							this.props.processing ? 'disabled' : ''
						}`}
						disabled={this.props.processing}
						value={guide.title}
						onChange={(e) => {
							e.preventDefault();
							const guide = getGuide(index);
							guide.title = e.target.value;
							setGuide(guide, index);
						}}
						id={`guide-title-${index}`}
					/>
					<textarea
						name={`guide-description-${index}`}
						placeholder={`Guide ${index + 1} Description`}
						className={`form-control form-control-sm mb-3 ${
							this.props.processing ? 'disabled' : ''
						}`}
						disabled={this.props.processing}
						value={guide.description}
						onChange={(e) => {
							e.preventDefault();
							const guide = getGuide(index);
							guide.description = e.target.value;
							setGuide(guide, index);
						}}
						id={`guide-description-${index}`}
					/>
					<button
						className='btn btn-danger btn-sm'
						onClick={(e) => {
							e.preventDefault();
							removeGuide(index);
						}}
					>
						Remove
					</button>
				</div>
				<label htmlFor='items'>Guide Items:</label>
				<div className='m-2'>
					<button
						className='btn btn-info btn-sm'
						onClick={(e) => {
							e.preventDefault();
							this.addItem({
								title: '',
								description: '',
							});
						}}
					>
						Add Item
					</button>
				</div>
				{guide.items.map((item, index) => (
					<GuideItem
						{...this.props}
						index={index}
						item={item}
						getItem={this.getItem.bind(this)}
						setItem={this.setItem.bind(this)}
						removeItem={this.removeItem.bind(this)}
						key={index}
						guideIndex={this.props.index}
					/>
				))}
			</div>
		);
	}
}
