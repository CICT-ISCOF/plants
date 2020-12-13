import React, { Component } from 'react';
import { Disease, Plant } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import state from '../../services/state';
import toastr from 'toastr';
import Model from '../../services/model';
import Controls from '../Controls';

type State = {
	plants: Array<Plant>;
	diseases: Array<Disease>;
};

export default class List extends Component<RouteComponentProps, State> {
	diseaseService = new Model<Disease>(undefined, 'diseases');
	plantService = new Model<Plant>(undefined, 'plants');

	isReorganizing = false;

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			diseases: [],
			plants: [],
		};
	}

	componentDidMount() {
		this.plantService.get((plants) =>
			this.isReorganizing ? null : this.setState({ plants })
		);
		this.diseaseService.get((diseases) =>
			this.isReorganizing ? null : this.setState({ diseases })
		);
	}

	findPlant(id: string, index: number) {
		const plant = this.state.plants.find((plant) => plant.id === id);
		if (!plant) {
			this.isReorganizing = true;
			const disease = this.state.diseases[index];
			const ids = disease.affected_plant_ids.filter(
				(plant_id) => plant_id !== id
			);
			new Model<Disease>(
				{
					id: disease.id,
					title: disease.title,
					symptoms: disease.symptoms,
					affected_plant_ids: ids,
					photo_url: disease.photo_url,
					description: disease.description,
				},
				'diseases',
				false
			)
				.save()
				.finally(() => (this.isReorganizing = false));
			return 'N\\A';
		}
		return plant?.name;
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
									<div className='card-header'>
										<Controls
											model={disease}
											{...this.props}
											index={index}
											remove={this.remove.bind(this)}
											name='Disease'
										/>
									</div>
									<div className='card-body'>
										<h3 className='card-title'>
											{disease.title}
										</h3>
										<p className='card-text'>
											{disease.description}
										</p>
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
													(id) => (
														<li className='list-group-item'>
															{this.findPlant(
																id,
																index
															)}
														</li>
													)
												)}
											</ul>
										</div>
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
