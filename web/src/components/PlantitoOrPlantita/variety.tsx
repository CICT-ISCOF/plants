import React, { Component } from 'react';
import { PlantitoVariety } from 'src/services/contracts';

interface Props {
	variety: PlantitoVariety;
}

export default class Variety extends Component<Props> {
	render() {
		const { variety } = this.props;
		return (
			<div className='card mx-2 my-3 border'>
				<div className='card-body'>
					<img
						src={variety.photo_url}
						alt=''
						className='card-img-top'
						style={{
							maxHeight: '200px',
						}}
					/>
					<b className='card-text'>Name:</b>
					<p className='card-text mt-2'>{variety.name}</p>
				</div>
			</div>
		);
	}
}
