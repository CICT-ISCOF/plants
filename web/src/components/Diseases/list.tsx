import React, { Component } from 'react';
import { Disease, Plant } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import state from '../../services/state';
import toastr from 'toastr';
import Model from '../../services/model';

type State = {
	plants: Array<Plant>;
	diseases: Array<Disease>;
};

export default class List extends Component<RouteComponentProps, State> {
	diseaseService = new Model<Disease>(undefined, 'diseases');
	plantService = new Model<Plant>(undefined, 'plants');

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			diseases: [],
			plants: [],
		};
	}

	componentDidMount() {
		this.plantService.get((plants) => this.setState({ plants }));
		this.diseaseService.get((diseases) => this.setState({ diseases }));
	}

	findPlant(id: string) {
		return this.state.plants.find((plant) => plant.id === id);
	}

	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	remove(index: number) {
		const disease = this.state.diseases[index];
		const modalID = `#deleteDiseaseModal${disease.id}`;
		const modal = $(modalID) as any;
		modal.on('hidden.bs.modal', async () => {
			try {
				await this.diseaseService.delete(disease.id as string);
				toastr.success('Disease deleted successfully.');
			} catch (error) {
				console.log(error);
				toastr.error('Unable to delete Disease.');
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
					{this.state.diseases.length > 0 ? (
						this.state.diseases.map((disease, index) => (
							<div
								className='col-sm-12 col-md-6 col-lg-4 p-3'
								data-id={disease.id}
								key={index}
							>
								<div className='card'>
									<img
										src={disease.photo_url}
										alt={disease.title}
										className='card-img-top'
									/>
									<div className='card-body'>
										<h3 className='card-title'>
											{disease.title}
										</h3>
										<div className='p-4'>
											<h6>Symptoms</h6>
											<ul className='list-group'>
												{disease.symptoms.map(
													(symptom) => (
														<li className='list-group-item'>
															{symptom}
														</li>
													)
												)}
											</ul>
										</div>
										<div className='p-4'>
											<h6>Affected Plants</h6>
											<ul className='list-group'>
												{disease.affected_plant_ids.map(
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
													`${disease.id}/edit`
												)}
											>
												Edit
											</Link>
										) : null}
										{state.has('user') ? (
											<a
												className='btn btn-danger btn-sm'
												href={this.path(
													`/${disease.id}/delete`
												)}
												data-toggle='modal'
												data-target={`#deleteDiseaseModal${disease.id}`}
											>
												Delete
											</a>
										) : null}
										{state.has('user') ? (
											<div
												className='modal fade'
												id={`deleteDiseaseModal${disease.id}`}
												tabIndex={-1}
												role='dialog'
												aria-labelledby={`deleteDiseaseModalLabel${disease.id}`}
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
																id={`deleteDiseaseModalLabel${disease.id}`}
															>
																Delete Disease
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
															{disease.title}?
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
