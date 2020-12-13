import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Model } from '../services/contracts';
import state from '../services/state';

interface Props extends RouteComponentProps {
	model: Model;
	index: number;
	remove: (index: number) => void;
	name: string;
}

export default class Controls extends Component<Props> {
	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	getIdentifier(model: any) {
		if ('title' in model) {
			return model.title;
		}
		if ('name' in model) {
			return model.name;
		}
		return 'N\\A';
	}

	render() {
		const model = this.props.model;
		return (
			<div className='d-flex'>
				{state.has('user') ? (
					<Link
						className='btn btn-info btn-sm mx-1'
						to={this.path(`${model.id}/edit`)}
					>
						Edit
					</Link>
				) : null}
				{state.has('user') ? (
					<a
						className='btn btn-danger btn-sm mx-1'
						href={this.path(`${model.id}/delete`)}
						data-toggle='modal'
						data-target={`#delete${this.props.name}Modal${model.id}`}
					>
						Delete
					</a>
				) : null}
				{state.has('user') ? (
					<div
						className='modal fade'
						id={`delete${this.props.name}Modal${model.id}`}
						tabIndex={-1}
						role='dialog'
						aria-labelledby={`delete${this.props.name}ModalLabel${model.id}`}
						aria-hidden='true'
					>
						<div
							className='modal-dialog modal-dialog-centered'
							role='document'
						>
							<div className='modal-content'>
								<div className='modal-header'>
									<h5
										className='modal-title'
										id={`delete${this.props.name}ModalLabel${model.id}`}
									>
										Delete {this.props.name}
									</h5>
									<button
										type='button'
										className='close'
										data-dismiss='modal'
										aria-label='Close'
									>
										<span aria-hidden='true'>&times;</span>
									</button>
								</div>
								<div className='modal-body'>
									Are you sure you want to delete{' '}
									{this.getIdentifier(model)}?
								</div>
								<div className='modal-footer'>
									<button
										type='button'
										className='btn btn-danger btn-sm'
										onClick={(e) => {
											e.preventDefault();
											this.props.remove(this.props.index);
										}}
									>
										Delete
									</button>
									<button
										type='button'
										className='btn btn-secondary btn-sm'
										data-dismiss='modal'
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
