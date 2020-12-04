import React, { Component, createRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Category, Plant } from '../../services/contracts';
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
	month: string;
};

type Params = {
	id: string;
};

export default class Form extends Component<
	RouteComponentProps<Params>,
	State
> {
	categoryService = new Model<Category>(undefined, 'categories');
	fileInputRef = createRef<HTMLInputElement>();
	fileReader = new FileReader();

	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			id: '',
			mode: 'Add',
			name: '',
			photo_url: 'https://via.placeholder.com/800x200',
			processing: false,
			category_id: '',
			month: 'January',
			categories: [],
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
		const fragments = this.props.match.path.split('/');
		if (fragments.includes('edit')) {
			const id = this.props.match.params.id;
			new Model<Plant>(undefined, 'plants').find(id).then((document) => {
				this.setState({
					mode: 'Edit',
					...document,
					processing: false,
					categories: this.state.categories,
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
				month: this.state.month,
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
						<label htmlFor='month'>Month:</label>
						<select
							name='month'
							id='month'
							className={`form-control form-control-sm ${
								this.state.processing ? 'disabled' : ''
							}`}
							disabled={this.state.processing}
							onChange={(e) => {
								e.preventDefault();
								this.setState({
									month: e.target.value,
								});
							}}
						>
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
								<option value={month} key={index}>
									{month}
								</option>
							))}
						</select>
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
