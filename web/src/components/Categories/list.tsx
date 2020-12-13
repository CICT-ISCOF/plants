import React, { Component } from 'react';
import { Category } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import db from '../../firebase/firestore';
import state from '../../services/state';
import toastr from 'toastr';
import Controls from '../Controls';
import Model from '../../services/model';

type State = {
	categories: Array<Category>;
};

export default class List extends Component<RouteComponentProps, State> {
	service = new Model<Category>(undefined, 'categories');

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			categories: [],
		};
	}

	componentDidMount() {
		this.service.get((categories) => this.setState({ categories }));
	}

	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	remove(index: number) {
		const category = this.state.categories[index];
		const modalID = `#deleteCategoryModal${category.id}`;
		const modal = $(modalID) as any;
		modal.on('hidden.bs.modal', async () => {
			db.collection('plants')
				.where('category_id', '==', category.id)
				.get()
				.then((plants) => {
					plants.forEach((plant) =>
						db.collection('plants').doc(plant.id).delete()
					);
				});
			try {
				await this.service.delete(category.id as string);
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
					{this.state.categories.length > 0 ? (
						this.state.categories.map((category, index) => (
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
										<h3 className='card-title'>
											{category.title}
										</h3>
										<Controls
											model={category}
											{...this.props}
											index={index}
											remove={this.remove.bind(this)}
											name='Category'
										/>
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
