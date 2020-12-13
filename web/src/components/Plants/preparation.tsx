import React, { Component } from 'react';
import { Preparation as Model } from 'src/services/contracts';

interface Props {
	preparation: Model;
}

export default class Preparation extends Component<Props> {
	render() {
		const { preparation } = this.props;
		return (
			<div className='card m-2'>
				<div className='card-body'>
					<h3 className='card-title'>{preparation.title}</h3>
					<p className='card-text'>Type: {preparation.type}</p>
					<div className='p-4'>
						<h6>Steps</h6>
						<ul className='list-group'>
							{preparation.steps.map((step) => (
								<li className='list-group-item'>{step}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
