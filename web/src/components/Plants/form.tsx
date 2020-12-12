import React, { Component, createRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Category, Plant, PlantCompanion } from '../../services/contracts';
import toastr from 'toastr';
import Model from '../../services/model';

type State = {
	id?: string;
	name: string;
	photo_url: string;
	mode: 'Add' | 'Edit';
	processing: boolean;
	category_id: string;
	categories: Array<Category>;
	months: Array<string>;
	plants: Array<Plant>;
	companions: Array<PlantCompanion>;
	description: string;
	layouts: Array<string>;
};

type Params = {
	id: string;
};

type FileRef = {
	ref: React.RefObject<HTMLInputElement>;
	reader: FileReader;
};

export default class Form extends Component<
	RouteComponentProps<Params>,
	State
> {
	categoryService = new Model<Category>(undefined, 'categories');
	plantService = new Model<Plant>(undefined, 'plants');
	fileInputRef = createRef<HTMLInputElement>();
	fileReader = new FileReader();

	layoutInputRefs: Array<FileRef> = [];

	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			id: '',
			mode: 'Add',
			name: '',
			photo_url: 'https://via.placeholder.com/800x200',
			processing: false,
			category_id: '',
			months: ['January'],
			categories: [],
			plants: [],
			companions: [],
			description: '',
			layouts: [],
		};
	}

	componentDidMount() {
		this.categoryService.get((categories) => {
			this.setState({
				categories,
				category_id:
					categories.length > 0 ? (categories[0].id as string) : '',
			});
		});
		this.plantService.once().then((plants) => {
			this.setState({ plants });
			if (plants.length > 0) {
				const companions = this.state.companions;
				companions.push({
					type: 'Good',
					plant_id: plants[0].id as string,
				});
				this.setState({ companions });
			}
		});
		const fragments = this.props.match.path.split('/');
		if (fragments.includes('edit')) {
			const id = this.props.match.params.id;
			new Model<Plant>(undefined, 'plants').find(id).then((document) => {
				document.layouts.forEach((_url, index) => {
					const ref = {
						ref: createRef<HTMLInputElement>(),
						reader: new FileReader(),
					};
					ref.reader.onload = (event) => {
						const layouts = this.state.layouts;
						layouts.splice(index, 1, String(event.target?.result));
						this.setState({ layouts });
					};
					this.layoutInputRefs.push(ref);
				});
				this.setState({
					mode: 'Edit',
					...document,
					processing: false,
					categories: this.state.categories,
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
			.then(() => toastr.success('Plant saved successfully.'))
			.catch(() => toastr.error('Unable to save Plant.'))
			.finally(() =>
				this.setState({
					processing: false,
				})
			);
	}

	request() {
		return new Model<Plant>(
			{
				id: this.state.id,
				name: this.state.name,
				photo_url: this.state.photo_url,
				category_id: this.state.category_id,
				months: this.state.months,
				companions: this.state.companions,
				description: this.state.description,
				layouts: this.state.layouts,
			},
			'plants'
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
							disabled={this.state.processing}
							value={this.state.name}
							onChange={(e) => {
								e.preventDefault();
								this.setState({
									name: e.target.value,
								});
							}}
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
							disabled={this.state.processing}
							value={this.state.description}
							onChange={(e) => {
								e.preventDefault();
								this.setState({
									description: e.target.value,
								});
							}}
						></textarea>
					</div>
					<div className='form-group'>
						<label htmlFor='category_id'>Category:</label>
						<select
							name='category_id'
							id='category_id'
							className={`form-control form-control-sm ${
								this.state.processing ? 'disabled' : ''
							}`}
							disabled={this.state.processing}
							onChange={(e) => {
								e.preventDefault();
								this.setState({
									category_id: e.target.value,
								});
							}}
						>
							{this.state.categories.map((category, index) => (
								<option
									value={category.id as string}
									key={index}
								>
									{category.title}
								</option>
							))}
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='month'>Months:</label>
						<div className='row'>
							{[
								'January',
								'February',
								'March',
								'April',
								'May',
								'June',
								'July',
								'August',
								'September',
								'October',
								'November',
								'December',
							].map((month, index) => (
								<div className='col-12 col-md-4 col-lg-3'>
									<div className='custom-control custom-checkbox'>
										<input
											type='checkbox'
											className='custom-control-input'
											id={`month-${index}`}
											checked={this.state.months.includes(
												month
											)}
											onChange={(e) => {
												const months = this.state
													.months;
												if (months.includes(month)) {
													months.splice(index, 1);
												} else {
													months.push(month);
												}
												this.setState({ months });
											}}
										/>
										<label
											className='custom-control-label'
											htmlFor={`month-${index}`}
										>
											{month}
										</label>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='form-group'>
						<label htmlFor='month'>Companions:</label>
						<table className='table'>
							<tbody>
								<tr>
									<td>
										<button
											className='btn btn-info btn-sm'
											onClick={(e) => {
												e.preventDefault();
												if (
													this.state.plants.length > 0
												) {
													const companions = this
														.state.companions;
													companions.push({
														type: 'Good',
														plant_id: this.state
															.plants[0]
															.id as string,
													});
													this.setState({
														companions,
													});
												}
											}}
										>
											Add Row
										</button>
									</td>
								</tr>
								{this.state.companions.map(
									(companion, index) => (
										<tr key={index}>
											<td>
												<select
													name={`companion-type-${index}`}
													id={`companion-type-${index}`}
													className={`form-control form-control-sm ${
														this.state.processing
															? 'disabled'
															: ''
													}`}
													disabled={
														this.state.processing
													}
													value={companion.type}
													onChange={(e) => {
														const companions = this
															.state.companions;
														companions[index].type =
															e.target.value;
														this.setState({
															companions,
														});
													}}
												>
													<option value='Good'>
														Good
													</option>
													<option value='Bad'>
														Bad
													</option>
												</select>
											</td>
											<td>
												<select
													name={`companion-plant-${index}`}
													id={`companion-plant-${index}`}
													className={`form-control form-control-sm ${
														this.state.processing
															? 'disabled'
															: ''
													}`}
													disabled={
														this.state.processing
													}
													value={companion.plant_id}
													onChange={(e) => {
														const companions = this
															.state.companions;
														companions[
															index
														].plant_id =
															e.target.value;
														this.setState({
															companions,
														});
													}}
												>
													{this.state.plants
														.filter(
															(plant) =>
																plant.id !==
																this.state.id
														)
														.map((plant, index) => (
															<option
																value={plant.id}
																key={index}
															>
																{plant.name}
															</option>
														))}
												</select>
											</td>
											<td>
												<button
													className='btn btn-danger btn-sm'
													onClick={(e) => {
														e.preventDefault();
														const companions = this
															.state.companions;
														companions.splice(
															index,
															1
														);
														this.setState({
															companions,
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
					<div className='form-group'>
						<label htmlFor='layouts'>Layouts:</label>
						<table className='table'>
							<tbody>
								<tr>
									<td>
										<button
											className='btn btn-info btn-sm'
											onClick={(e) => {
												e.preventDefault();
												const layouts = this.state
													.layouts;
												const index =
													layouts.push(
														'https://via.placeholder.com/200'
													) - 1;

												const ref = {
													ref: createRef<HTMLInputElement>(),
													reader: new FileReader(),
												};

												ref.reader.onload = (event) => {
													const layouts = this.state
														.layouts;
													layouts.splice(
														index,
														1,
														String(
															event.target?.result
														)
													);
													this.setState({ layouts });
												};

												this.layoutInputRefs.push(ref);
												this.setState({ layouts });
											}}
										>
											Add Row
										</button>
									</td>
								</tr>
								{this.state.layouts.map((url, index) => (
									<tr key={index}>
										<td className='text-center'>
											<input
												type='file'
												name=''
												id=''
												ref={
													this.layoutInputRefs[index]
														.ref
												}
												className='d-none'
												onChange={(e) => {
													e.preventDefault();
													if (
														e.target.files &&
														e.target.files.length >
															0
													) {
														const reader = this
															.layoutInputRefs[
															index
														].reader;
														reader.readAsDataURL(
															e.target.files[0]
														);
													}
												}}
											/>
											<img
												src={url}
												alt=''
												style={{
													maxHeight: '200px',
													maxWidth: '200px',
												}}
												className='img-fluid rounded my-3 mx-2 text-center clickable'
												onClick={(e) => {
													e.preventDefault();
													const ref = this
														.layoutInputRefs[index]
														.ref;
													ref.current?.click();
												}}
											/>
										</td>
										<td>
											<button
												className='btn btn-danger btn-sm'
												onClick={(e) => {
													e.preventDefault();
													this.layoutInputRefs.splice(
														index,
														1
													);
													const layouts = this.state
														.layouts;
													layouts.splice(index, 1);
													this.setState({ layouts });
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
