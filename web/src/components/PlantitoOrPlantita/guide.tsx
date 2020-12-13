import React, { Component } from 'react';
import { PlantitoGuide } from '../../services/contracts';

interface Props {
	guide: PlantitoGuide;
}

export default class Guide extends Component<Props> {
	render() {
		const guide = this.props.guide;
		return (
			<div className='card m-2'>
				<div className='card-body'>
					<h3 className='card-title'>{guide.title}</h3>
					<p className='card-text'>{guide.description}</p>
					{guide.items.map((item, index) => (
						<div key={index} className='p-1 m-1'>
							<b>{item.title}</b>
							<p className='card-text'>{item.description}</p>
						</div>
					))}
				</div>
			</div>
		);
	}
}
