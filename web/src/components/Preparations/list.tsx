import React, { Component } from 'react';
import { Plant, Preparation } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import state from '../../services/state';
import toastr from 'toastr';
import Model from '../../services/model';

type State = {
	preparations: Array<Preparation>;
	plants: Array<Plant>;
};

export default class List extends Component<RouteComponentProps, State> {
	preparationService = new Model<Preparation>(undefined, 'preparations');
	plantService = new Model<Plant>(undefined, 'plants');

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			preparations: [],
			plants: [],
		};
	}

	componentDidMount() {
		this.preparationService.get((preparations) =>
			this.setState({ preparations })
		);
		this.plantService.get((plants) => this.setState({ plants }));
	}

	findPlant(id: string) {
		const plant = this.state.plants.find((plant) => plant.id === id);
		return plant ? plant.name : 'N\\A';
	}

	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	remove(index: number) {
		const preparation = this.state.preparations[index];
		const modalID = `#deletePreparationModal${preparation.id}`;
		const modal = $(modalID) as any;
		modal.on('hidden.bs.modal', async () => {
			try {
				await this.preparationService.delete(preparation.id as string);
				toastr.success('Preparation deleted successfully.');
			} catch (error) {
				console.log(error);
				toastr.error('Unable to delete Preparation.');
			}
		});
		modal.modal('hide');
	}

	render() {
		return (
			<div className='container pt-3'>
				<div className='d-flex'>
					{state.has('user') ? (
						<Link
							to={this.path('add')}
							className='btn btn-secondary btn-sm'
						>
							Add
						</Link>
					) : null}
				</div>
				<div className='row'>
					{this.state.preparations.length > 0 ? (
						this.state.preparations.map((preparation, index) => (
							<div
								className='col-sm-12 col-md-6 col-lg-4 p-3'
								data-id={preparation.id}
								key={index}
							>
								<div className='card'>
									<div className='card-body'>
										<h3 className='card-title'>
											{preparation.title}
										</h3>
										<p className='card-text'>
											Type: {preparation.type}
										</p>
										<p className='card-text'>
											For Plant:{' '}
											{this.findPlant(
												preparation.plant_id
											)}
										</p>
										<div className='p-4'>
											<h6>Steps</h6>
											<ul className='list-group'>
												{preparation.steps.map(
													(step) => (
														<li className='list-group-item'>
															{step}
														</li>
													)
												)}
											</ul>
										</div>
										{state.has('user') ? (
											<Link
												className='btn btn-info btn-sm'
												to={this.path(
													`${preparation.id}/edit`
												)}
											>
												Edit
											</Link>
										) : null}
										{state.has('user') ? (
											<a
												className='btn btn-danger btn-sm'
												href={this.path(
													`/${preparation.id}/delete`
												)}
												data-toggle='modal'
												data-target={`#deletePreparationModal${preparation.id}`}
											>
												Delete
											</a>
										) : null}
										{state.has('user') ? (
											<div
												className='modal fade'
												id={`deletePreparationModal${preparation.id}`}
												tabIndex={-1}
												role='dialog'
												aria-labelledby={`deletePreparationModalLabel${preparation.id}`}
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
																id={`deletePreparationModalLabel${preparation.id}`}
															>
																Delete
																Preparation
															</h5>
															<button
																type='button'
																className='close'
																data-dismiss='modal'
																aria-label='Close'
															>
																<span aria-hidden='true'>
																	&times;
																</span>
															</button>
														</div>
														<div className='modal-body'>
															Are you sure you
															want to delete{' '}
															{preparation.title}?
														</div>
														<div className='modal-footer'>
															<button
																type='button'
																className='btn btn-danger btn-sm'
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	this.remove(
																		index
																	);
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
								</div>
							</div>
						))
					) : (
						<div className='col-12 text-center'>No Data</div>
					)}
				</div>
			</div>
		);
	}
}
