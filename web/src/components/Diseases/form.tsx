import React, { Component, createRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Disease, Plant } from '../../services/contracts';
import toastr from 'toastr';
import Model from '../../services/model';

type State = {
	id?: string;
	title: string;
	photo_url: string;
	affected_plant_ids: Array<string>;
	mode: 'Add' | 'Edit';
	processing: boolean;
	plants: Array<Plant>;
	symptoms: Array<string>;
	description: string;
};

type Params = {
	id: string;
};

export default class Form extends Component<
	RouteComponentProps<Params>,
	State
> {
	fileInputRef = createRef<HTMLInputElement>();
	fileReader = new FileReader();
	plantService = new Model<Plant>(undefined, 'plants');

	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			id: '',
			mode: 'Add',
			title: '',
			affected_plant_ids: [],
			photo_url: 'https://via.placeholder.com/800x200',
			processing: false,
			plants: [],
			symptoms: [''],
			description: '',
		};
	}

	componentDidMount() {
		this.plantService.get((plants) => this.setState({ plants }));
		const fragments = this.props.match.path.split('/');
		if (fragments.includes('edit')) {
			const id = this.props.match.params.id;
			new Model<Disease>(undefined, 'diseases')
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
		this.fileReader.onload = (event) => {
			this.setState({
				photo_url: String(event.target?.result),
			});
		};
	}

	promptUpload(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
		e.preventDefault();
		this.fileInputRef.current?.click();
	}

	handleFile(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		if (e.target.files) {
			const file = e.target.files[0];
			this.fileReader.readAsDataURL(file);
		}
	}

	submit() {
		this.setState({
			processing: true,
		});
		this.request()
			.then(() => toastr.success('Disease saved successfully.'))
			.catch(() => toastr.error('Unable to save Disease.'))
			.finally(() =>
				this.setState({
					processing: false,
				})
			);
	}

	request() {
		return new Model<Disease>(
			{
				id: this.state.id,
				title: this.state.title,
				photo_url: this.state.photo_url,
				affected_plant_ids: this.state.affected_plant_ids,
				symptoms: this.state.symptoms,
				description: this.state.description,
			},
			'diseases'
		).save();
	}

	handleAffectedPlantInput(plant: Plant) {
		const id = plant.id as string;
		const ids = this.state.affected_plant_ids;
		if (ids.includes(id)) {
			const index = ids.indexOf(id);
			ids.splice(index, 1);
		} else {
			ids.push(id);
		}
		this.setState({ affected_plant_ids: ids });
	}

	getAffectedPlantInputState(plant: Plant) {
		return this.state.affected_plant_ids.includes(plant.id as string);
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
					<input
						type='file'
						name='photo'
						id='photo'
						className='d-none'
						ref={this.fileInputRef}
						onChange={(e) => this.handleFile(e)}
					/>
					<div className='text-center'>
						<img
							src={this.state.photo_url}
							alt='Upload'
							className='img-fluid rounded my-3 mx-2 text-center clickable'
							style={{
								maxHeight: '200px',
							}}
							onClick={(e) => this.promptUpload(e)}
						/>
					</div>
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
						<label htmlFor='description'>Description:</label>
						<textarea
							name='description'
							id='description'
							placeholder='Description'
							className={`form-control form-control-sm ${
								this.state.processing ? 'disabled' : ''
							}`}
							value={this.state.description}
							onChange={(e) => {
								e.preventDefault();
								this.setState({
									description: e.target.value,
								});
							}}
							disabled={this.state.processing}
						></textarea>
					</div>
					<div className='form-group'>
						<label htmlFor='symptoms'>Symptoms:</label>
						<div className='p-4'>
							<table className='table'>
								<tbody>
									<tr>
										<td>
											<button
												className='btn btn-info btn-sm'
												onClick={(e) => {
													e.preventDefault();
													const symptoms = this.state
														.symptoms;
													symptoms.push('');
													this.setState({ symptoms });
												}}
											>
												Add
											</button>
										</td>
									</tr>
									{this.state.symptoms.map(
										(symptom, index) => (
											<tr>
												<td>
													<input
														type='text'
														name={`symptom-${index}`}
														id={`symptom-${index}`}
														placeholder={`Symptom ${
															index + 1
														}`}
														className={`form-control form-control-sm ${
															this.state
																.processing
																? 'disabled'
																: ''
														}`}
														value={symptom}
														onChange={(e) => {
															e.preventDefault();
															const symptoms = this
																.state.symptoms;
															symptoms[index] =
																e.target.value;
															this.setState({
																symptoms,
															});
														}}
														disabled={
															this.state
																.processing
														}
													/>
												</td>
												<td>
													<button
														className='btn btn-dark btn-sm'
														onClick={(e) => {
															e.preventDefault();
															const symptoms = this
																.state.symptoms;
															symptoms.splice(
																index,
																1
															);
															this.setState({
																symptoms,
															});
														}}
													>
														Remove
													</button>
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>
					<div className='form-group'>
						<label htmlFor='affected_plant_ids'>
							Affected Plants:
						</label>
						<div className='container-fluid row'>
							{this.state.plants.map((plant) => (
								<div className='col-12 col-md-4 col-lg-3'>
									<div className='custom-control custom-checkbox'>
										<input
											type='checkbox'
											className='custom-control-input'
											id={`plant-${plant.id}`}
											checked={this.getAffectedPlantInputState(
												plant
											)}
											onChange={(e) => {
												// e.preventDefault();
												this.handleAffectedPlantInput(
													plant
												);
											}}
											value={plant.id as string}
										/>
										<label
											className='custom-control-label'
											htmlFor={`plant-${plant.id}`}
										>
											{plant.name}
										</label>
									</div>
								</div>
							))}
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
