import React, { Component, createRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/firestore';
import { Category } from '../../services/contracts';
import toastr from 'toastr';
import Model from '../../services/model';

type State = {
	id?: string;
	title: string;
	photo_url: string;
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
	fileInputRef = createRef<HTMLInputElement>();
	fileReader = new FileReader();

	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			id: '',
			mode: 'Add',
			title: '',
			photo_url: 'https://via.placeholder.com/800x200',
			processing: false,
		};
	}

	componentDidMount() {
		const fragments = this.props.match.path.split('/');
		if (fragments.includes('edit')) {
			const id = this.props.match.params.id;
			new Model<Category>(undefined, 'categories')
				.find(id)
				.then((document) => {
					this.setState({
						mode: 'Edit',
						...document,
						processing: false,
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
			.then(() => toastr.success('Category saved successfully.'))
			.catch(() => toastr.error('Unable to save Category.'))
			.finally(() =>
				this.setState({
					processing: false,
				})
			);
	}

	request() {
		return new Model<Category>(
			{
				id: this.state.id,
				title: this.state.title,
				photo_url: this.state.photo_url,
			},
			'categories'
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
