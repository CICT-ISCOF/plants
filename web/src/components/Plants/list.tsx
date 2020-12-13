import React, { Component } from 'react';
import { Category, Plant } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import state from '../../services/state';
import toastr from 'toastr';
import Model from '../../services/model';
import Controls from '../Controls';
import Preparation from './preparation';

type State = {
	plants: Array<Plant>;
	categories: {
		[id: string]: Category;
	};
	sort: 'None' | 'Month' | 'Newest' | 'Oldest';
};

export default class List extends Component<RouteComponentProps, State> {
	categoryService = new Model<Category>(undefined, 'categories');
	plantService = new Model<Plant>(undefined, 'plants');

	isReorganizing = false;

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			plants: [],
			categories: {},
			sort: 'None',
		};
	}

	componentDidMount() {
		this.categoryService.get((categories) => {
			const data = this.state.categories;
			categories.forEach((category) => {
				data[category.id as string] = category;
			});
			if (!this.isReorganizing) {
				this.setState({ categories: data });
			}
		});
		this.plantService.get((plants) => {
			if (!this.isReorganizing) {
				this.setState({ plants });
			}
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
			try {
				await this.plantService.delete(plant.id as string);
				toastr.success('Plant deleted successfully.');
			} catch (error) {
				console.log(error);
				toastr.error('Unable to delete Plant.');
			}
		});
		modal.modal('hide');
	}

	getCategoryName(plant: Plant) {
		return plant.category_id in this.state.categories
			? this.state.categories[plant.category_id].title
			: 'N\\A';
	}

	findPlant(id: string, index: number) {
		const plant = this.state.plants.find((plant) => plant.id === id);
		if (!plant) {
			this.isReorganizing = true;
			const parent = this.state.plants[index];
			const companions = parent.companions.filter(
				(companion) => companion.plant_id !== id
			);
			new Model<Plant>(
				{
					id: parent.id,
					name: parent.name,
					photo_url: parent.photo_url,
					category_id: parent.category_id,
					months: parent.months,
					companions: companions,
					description: parent.description,
					layouts: parent.layouts,
					preparations: parent.preparations,
				},
				'plants',
				false
			)
				.save()
				.finally(() => (this.isReorganizing = false));
		}
		return plant ? plant.name : 'N\\A';
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
								className='col-12 p-3'
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
										<b className='card-text'>Category:</b>
										<p className='card-text'>
											{this.getCategoryName(plant)}
										</p>
										<b className='card-text'>
											Description:
										</b>
										<p className='card-text'>
											{plant.description}
										</p>
										<b className='card-text'>Months:</b>
										<ul className='mb-3 list-group'>
											{plant.months.map((month) => (
												<li className='list-group-item'>
													{month}
												</li>
											))}
										</ul>
										<b className='card-text'>Companions:</b>
										{plant.companions.length === 0 ? (
											<p className='card-text'>None</p>
										) : null}
										<ul className='mb-3 list-group'>
											{plant.companions
												.sort((c1, c2) => {
													return c1.type === c2.type
														? 0
														: -1;
												})
												.map((companion) => (
													<li className='list-group-item'>
														Name:{' '}
														{this.findPlant(
															companion.plant_id,
															index
														)}
														<br />
														Type: {companion.type}
													</li>
												))}
										</ul>
										<b className='card-text'>Layouts:</b>
										{plant.layouts.length === 0 ? (
											<p className='card-text'>None</p>
										) : null}
										<div className='my-3 row'>
											{plant.layouts.map((url, index) => (
												<div
													className='col-12 col-md-6 col-lg-4 text-center'
													key={index}
												>
													<img
														src={url}
														alt=''
														className='img-fluid'
														style={{
															maxHeight: '200px',
														}}
													/>
												</div>
											))}
										</div>
										<b className='card-text'>
											Preparations:
										</b>
										{plant.preparations.length === 0 ? (
											<p className='card-text'>None</p>
										) : null}
										<div className='my-3'>
											{plant.preparations.map(
												(preparation, index) => (
													<Preparation
														preparation={
															preparation
														}
														key={index}
													/>
												)
											)}
										</div>
										<Controls
											{...this.props}
											{...this.state}
											model={plant}
											index={index}
											remove={this.remove.bind(this)}
											name='Plant'
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
