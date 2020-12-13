import React, { Component } from 'react';
import { PlantitoItem } from '../../services/contracts';

interface Props {
	item: PlantitoItem;
}

export default class Item extends Component<Props> {
	render() {
		const item = this.props.item;
		return (
			<div className='card m-2'>
				<div className='card-body'>
					<img
						src={item.photo_url}
						alt=''
						className='card-img-top'
						style={{
							maxHeight: '200px',
						}}
					/>
					<p className='card-text'>{item.body}</p>
				</div>
			</div>
		);
	}
}
