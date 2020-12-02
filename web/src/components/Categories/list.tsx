import React, { Component } from 'react';
import { Category } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import db from '../../firebase/firestore';
import state from '../../services/state';
import toastr from 'toastr';

type State = {
	categories: Array<Category>;
};

export default class List extends Component<RouteComponentProps, State> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			categories: [],
		};
	}

	componentDidMount() {
		const collection = db.collection('categories');
		collection.onSnapshot((snapshot) => {
			const categories: Array<Category> = [];
			snapshot.forEach((document) =>
				categories.push({
					...(document.data() as Category),
					id: document.id,
				})
			);
			this.setState({ categories });
		});
	}

	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	remove(index: number) {
		const category = this.state.categories[index];
		const modalID = `#deleteCategoryModal${category.id}`;
		const modal = $(modalID) as any;
		modal.on('hidden.bs.modal', async () => {
			const document = db.collection('categories').doc(category.id);
			try {
				await document.delete();
				toastr.success('Category deleted successfully.');
			} catch (error) {
				console.log(error);
				toastr.error('Unable to delete category.');
			}
		});
		modal.modal('hide');
	}

	render() {
		return (
			<div className='container pt-3'>
				<div className='d-flex'>
					<Link
						to={this.path('add')}
						className='btn btn-secondary btn-sm'
					>
						Add
					</Link>
				</div>
				<div className='row'>
					{this.state.categories.map((category, index) => (
						<div
							className='col-sm-12 col-md-6 col-lg-4 col-xl-3 p-3'
							data-id={category.id}
							key={index}
						>
							<div className='card'>
								<img
									src={category.photo_url}
									alt={category.title}
									className='card-img-top'
								/>
								<div className='card-body'>
									<div className='card-title'>
										{category.title}
									</div>
									{state.has('user') ? (
										<Link
											className='btn btn-info btn-sm'
											to={this.path(
												`${category.id}/edit`
											)}
										>
											Edit
										</Link>
									) : null}
									{state.has('user') ? (
										<a
											className='btn btn-danger btn-sm'
											href={this.path(
												`/${category.id}/delete`
											)}
											data-toggle='modal'
											data-target={`#deleteCategoryModal${category.id}`}
										>
											Delete
										</a>
									) : null}
									{state.has('user') ? (
										<div
											className='modal fade'
											id={`deleteCategoryModal${category.id}`}
											tabIndex={-1}
											role='dialog'
											aria-labelledby={`deleteCategoryModalLabel${category.id}`}
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
															id={`deleteCategoryModalLabel${category.id}`}
														>
															Delete Category
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
														Are you sure you want to
														delete {category.title}?
													</div>
													<div className='modal-footer'>
														<button
															type='button'
															className='btn btn-danger btn-sm'
															onClick={(e) => {
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
					))}
				</div>
			</div>
		);
	}
}
