import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Plant, Preparation } from '../../services/contracts';
import toastr from 'toastr';
import Model from '../../services/model';

type State = {
	id?: string;
	title: string;
	type: string;
	plant_id: string;
	plants: Array<Plant>;
	steps: Array<string>;
	mode: 'Add' | 'Edit';
	processing: boolean;
};

type Params = {
	id: string;
};

export default class Form extends Component<
	RouteComponentProps<Params>,
	State
> {
	plantService = new Model<Plant>(undefined, 'plants');

	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			id: '',
			mode: 'Add',
			title: '',
			type: '',
			plant_id: '',
			plants: [],
			steps: [''],
			processing: false,
		};
	}

	componentDidMount() {
		this.plantService.get((plants) =>
			this.setState({
				plants,
				plant_id: plants.length > 0 ? (plants[0].id as string) : '',
			})
		);
		const fragments = this.props.match.path.split('/');
		if (fragments.includes('edit')) {
			const id = this.props.match.params.id;
			new Model<Preparation>(undefined, 'preparations')
				.find(id)
				.then((document) => {
					this.setState({
						mode: 'Edit',
						...document,
						processing: false,
						plants: this.state.plants,
					});
				});
		}
	}

	submit() {
		this.setState({
			processing: true,
		});
		this.request()
			.then(() => toastr.success('Preparation saved successfully.'))
			.catch(() => toastr.error('Unable to save Preparation.'))
			.finally(() =>
				this.setState({
					processing: false,
				})
			);
	}

	request() {
		return new Model<Preparation>(
			{
				id: this.state.id,
				title: this.state.title,
				type: this.state.type,
				plant_id: this.state.plant_id,
				steps: this.state.steps,
			},
			'preparations'
		).save();
	}

	render() {
		return (
			<div className='container pt-3'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						this.submit();
					}}
				>
					<div className='form-group'>
						<label htmlFor='title'>Title:</label>
						<input
							type='text'
							name='title'
							id='title'
							placeholder='Title'
							className={`form-control form-control-sm ${
								this.state.processing ? 'disabled' : ''
							}`}
							value={this.state.title}
							onChange={(e) => {
								e.preventDefault();
								this.setState({
									title: e.target.value,
								});
							}}
							disabled={this.state.processing}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='type'>Type:</label>
						<input
							type='text'
							name='type'
							id='type'
							placeholder='Type'
							className={`form-control form-control-sm ${
								this.state.processing ? 'disabled' : ''
							}`}
							value={this.state.type}
							onChange={(e) => {
								e.preventDefault();
								this.setState({
									type: e.target.value,
								});
							}}
							disabled={this.state.processing}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='plant_id'>Plant:</label>
						<select
							name='plant_id'
							id='plant_id'
							className={`form-control form-control-sm ${
								this.state.processing ? 'disabled' : ''
							}`}
							disabled={this.state.processing}
							onChange={(e) => {
								e.preventDefault();
								this.setState({
									plant_id: e.target.value,
								});
							}}
						>
							{this.state.plants.map((plant) => (
								<option value={plant.id as string}>
									{plant.name}
								</option>
							))}
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='steps'>Steps:</label>
						<div className='p-4'>
							<table className='table'>
								<tbody>
									<tr>
										<td>
											<button
												className='btn btn-info btn-sm'
												onClick={(e) => {
													e.preventDefault();
													const steps = this.state
														.steps;
													steps.push('');
													this.setState({ steps });
												}}
											>
												Add
											</button>
										</td>
									</tr>
									{this.state.steps.map((step, index) => (
										<tr>
											<td>
												<input
													type='text'
													name={`step-${index}`}
													id={`step-${index}`}
													placeholder={`Step ${
														index + 1
													}`}
													className={`form-control form-control-sm ${
														this.state.processing
															? 'disabled'
															: ''
													}`}
													value={step}
													onChange={(e) => {
														e.preventDefault();
														const steps = this.state
															.steps;
														steps[index] =
															e.target.value;
														this.setState({
															steps,
														});
													}}
													disabled={
														this.state.processing
													}
												/>
											</td>
											<td>
												<button
													className='btn btn-dark btn-sm'
													onClick={(e) => {
														e.preventDefault();
														const steps = this.state
															.steps;
														steps.splice(index, 1);
														this.setState({
															steps,
														});
													}}
												>
													Remove
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className='form-group'>
						<button
							type='submit'
							className={`btn btn-primary btn-sm ${
								this.state.processing ? 'disabled' : ''
							}`}
							disabled={this.state.processing}
						>
							{this.state.processing ? 'Saving...' : 'Save'}
						</button>
					</div>
				</form>
			</div>
		);
	}
}
