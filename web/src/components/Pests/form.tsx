import React, { Component, createRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/firestore';
import { Pest, Plant } from '../../services/contracts';
import toastr from 'toastr';
import Model from '../../services/model';

type State = {
	id?: string;
	name: string;
	affected_plant_ids: Array<string>;
	plants: Array<Plant>;
	mode: 'Add' | 'Edit';
	processing: boolean;
	photo_url: string;
};

type Params = {
	id: string;
};

export default class Form extends Component<
	RouteComponentProps<Params>,
	State
> {
	plantService = new Model<Plant>(undefined, 'plants');
	fileInputRef = createRef<HTMLInputElement>();
	fileReader = new FileReader();

	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			id: '',
			mode: 'Add',
			name: '',
			affected_plant_ids: [],
			plants: [],
			processing: false,
			photo_url: 'https://via.placeholder.com/800x200',
		};
	}

	componentDidMount() {
		this.plantService.get((plants) => this.setState({ plants }));
		const fragments = this.props.match.path.split('/');
		if (fragments.includes('edit')) {
			const id = this.props.match.params.id;
			new Model<Pest>(undefined, 'pests').find(id).then((document) => {
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
			.then(() => toastr.success('Pest saved successfully.'))
			.catch(() => toastr.error('Unable to save Pest.'))
			.finally(() =>
				this.setState({
					processing: false,
				})
			);
	}

	request() {
		return new Model<Pest>(
			{
				id: this.state.id,
				name: this.state.name,
				photo_url: this.state.photo_url,
				affected_plant_ids: this.state.affected_plant_ids,
			},
			'pests'
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
						<label htmlFor='name'>Name:</label>
						<input
							type='text'
							name='name'
							id='name'
							placeholder='Name'
							className={`form-control form-control-sm ${
								this.state.processing ? 'disabled' : ''
							}`}
							value={this.state.name}
							onChange={(e) => {
								e.preventDefault();
								this.setState({
									name: e.target.value,
								});
							}}
							disabled={this.state.processing}
						/>
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
											checked={this.state.affected_plant_ids.includes(
												plant.id as string
											)}
											onChange={(e) => {
												// e.preventDefault();
												const ids = this.state
													.affected_plant_ids;
												if (
													this.state.affected_plant_ids.includes(
														plant.id as string
													)
												) {
													const index = ids.indexOf(
														plant.id as string
													);
													ids.splice(index, 1);
												} else {
													ids.push(
														plant.id as string
													);
												}
												this.setState({
													affected_plant_ids: ids,
												});
											}}
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
							Save
						</button>
					</div>
				</form>
			</div>
		);
	}
}
