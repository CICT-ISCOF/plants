import React, { Component } from 'react';
import { Pest, Plant } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import state from '../../services/state';
import toastr from 'toastr';
import Model from '../../services/model';

type State = {
	pests: Array<Pest>;
	plants: Array<Plant>;
};

export default class List extends Component<RouteComponentProps, State> {
	plantService = new Model<Plant>(undefined, 'plants');
	pestService = new Model<Pest>(undefined, 'pests');

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			pests: [],
			plants: [],
		};
	}

	componentDidMount() {
		this.pestService.get((pests) => this.setState({ pests }));
		this.plantService.get((plants) => this.setState({ plants }));
	}

	findPlant(id: string) {
		return this.state.plants.find((plant) => plant.id === id);
	}

	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	remove(index: number) {
		const pest = this.state.pests[index];
		const modalID = `#deletePestModal${pest.id}`;
		const modal = $(modalID) as any;
		modal.on('hidden.bs.modal', async () => {
			try {
				await this.pestService.delete(pest.id as string);
				toastr.success('Pest deleted successfully.');
			} catch (error) {
				console.log(error);
				toastr.error('Unable to delete Pest.');
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
					{this.state.pests.length > 0 ? (
						this.state.pests.map((pest, index) => (
							<div
								className='col-sm-12 col-md-6 col-lg-4 col-xl-3'
								data-id={pest.id}
								key={index}
							>
								<div className='card'>
									<div className='card-body'>
										<img
											src={pest.photo_url}
											alt=''
											className='card-img-top'
										/>
										<h3 className='card-title'>
											{pest.name}
										</h3>
										<div className='p-4'>
											<h6>Affected Plants</h6>
											<ul className='list-group'>
												{pest.affected_plant_ids.map(
													(id) => {
														const plant = this.findPlant(
															id
														);
														if (plant) {
															return (
																<li className='list-group-item'>
																	{plant.name}
																</li>
															);
														}
														return (
															<li className='list-group-item'>
																N\A
															</li>
														);
													}
												)}
											</ul>
										</div>
										{state.has('user') ? (
											<Link
												className='btn btn-info btn-sm'
												to={this.path(
													`${pest.id}/edit`
												)}
											>
												Edit
											</Link>
										) : null}
										{state.has('user') ? (
											<a
												className='btn btn-danger btn-sm'
												href={this.path(
													`/${pest.id}/delete`
												)}
												data-toggle='modal'
												data-target={`#deletePestModal${pest.id}`}
											>
												Delete
											</a>
										) : null}
										{state.has('user') ? (
											<div
												className='modal fade'
												id={`deletePestModal${pest.id}`}
												tabIndex={-1}
												role='dialog'
												aria-labelledby={`deletePestModalLabel${pest.id}`}
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
																id={`deletePestModalLabel${pest.id}`}
															>
																Delete Pest
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
															{pest.name}?
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
