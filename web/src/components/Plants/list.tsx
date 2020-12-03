import React, { Component } from 'react';
import { Category, Plant } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import db from '../../firebase/firestore';
import state from '../../services/state';
import toastr from 'toastr';
import Model from '../../services/model';

type State = {
	plants: Array<Plant>;
	categories: {
		[id: string]: Category;
	};
};

export default class List extends Component<RouteComponentProps, State> {
	categoryService = new Model<Category>(undefined, 'categories');
	plantService = new Model<Plant>(undefined, 'plants');
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			plants: [],
			categories: {},
		};
	}

	componentDidMount() {
		this.categoryService.get((categories) => {
			const data = this.state.categories;
			categories.forEach((category) => {
				data[category.id as string] = category;
			});
			this.setState({ categories: data });
		});
		this.plantService.get((plants) => {
			this.setState({ plants });
		});
	}

	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	remove(index: number) {
		const plant = this.state.plants[index];
		const modalID = `#deletePlantModal${plant.id}`;
		const modal = $(modalID) as any;
		modal.on('hidden.bs.modal', async () => {
			const document = db.collection('plants').doc(plant.id);
			try {
				await document.delete();
				toastr.success('Plant deleted successfully.');
			} catch (error) {
				console.log(error);
				toastr.error('Unable to delete Plant.');
			}
		});
		modal.modal('hide');
	}

	getCategoryName(plant: Plant) {
		return this.state.categories[plant.category_id].title;
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
					{this.state.plants.length > 0 ? (
						this.state.plants.map((plant, index) => (
							<div
								className='col-sm-12 col-md-6 col-lg-4 col-xl-3 p-3'
								data-id={plant.id}
								key={index}
							>
								<div className='card'>
									<img
										src={plant.photo_url}
										alt={plant.name}
										className='card-img-top'
									/>
									<div className='card-body'>
										<h3 className='card-title'>
											{plant.name}
										</h3>
										<p className='card-text'>
											Category:{' '}
											{this.getCategoryName(plant)}
										</p>
										{state.has('user') ? (
											<Link
												className='btn btn-info btn-sm'
												to={this.path(
													`${plant.id}/edit`
												)}
											>
												Edit
											</Link>
										) : null}
										{state.has('user') ? (
											<a
												className='btn btn-danger btn-sm'
												href={this.path(
													`/${plant.id}/delete`
												)}
												data-toggle='modal'
												data-target={`#deletePlantModal${plant.id}`}
											>
												Delete
											</a>
										) : null}
										{state.has('user') ? (
											<div
												className='modal fade'
												id={`deletePlantModal${plant.id}`}
												tabIndex={-1}
												role='dialog'
												aria-labelledby={`deletePlantModalLabel${plant.id}`}
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
																id={`deletePlantModalLabel${plant.id}`}
															>
																Delete Plant
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
															{plant.name}?
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
