import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<footer
				className='footer'
				style={{
					position: 'absolute',
					bottom: 0,
					width: '-webkit-fill-available',
				}}
			>
				<div className='container-fluid'>
					<div className='row'>
						<div className='credits ml-auto'>
							<span className='copyright'>© 2020</span>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
