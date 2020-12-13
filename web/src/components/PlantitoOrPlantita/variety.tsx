import React, { Component } from 'react';
import { PlantitoVariety } from 'src/services/contracts';

interface Props {
	variety: PlantitoVariety;
}

export default class Variety extends Component<Props> {
	render() {
		const { variety } = this.props;
		return (
			<div className='card m-2'>
				<div className='card-body'>
					<img
						src={variety.photo_url}
						alt=''
						className='card-img-top'
						style={{
							maxHeight: '200px',
						}}
					/>
					<p className='card-text'>{variety.name}</p>
				</div>
			</div>
		);
	}
}
