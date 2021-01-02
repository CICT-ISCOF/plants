import React, { Component, createRef, RefObject } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/firestore';
import { Tip, TipItem } from '../../services/contracts';
import toastr from 'toastr';

type State = {
	id: string;
	title: string;
	items: Array<TipItem>;
	mode: 'Add' | 'Edit';
	processing: boolean;
};

type Params = {
	id: string;
};

export default class Form extends Component<RouteComponentProps<Params>, State> {
	fileInputRefs: Array<RefObject<HTMLInputElement>> = [createRef<HTMLInputElement>()];

	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			id: '',
			mode: 'Add',
			title: '',
			items: [
				{
					title: '',
					description: '',
					photo_url: 'https://via.placeholder.com/200',
				},
			],
			processing: false,
		};
	}

	componentDidMount() {
		const fragments = this.props.match.path.split('/');
		if (fragments.includes('edit')) {
			const id = this.props.match.params.id;
			const collection = firebase.firestore().collection('tips');
			collection
				.doc(id)
				.get()
				.then((document) => {
					const tip = document.data() as Tip;
					this.fileInputRefs = [];
					tip.items.forEach(() => this.fileInputRefs.push(createRef<HTMLInputElement>()));
					this.setState({
						mode: 'Edit',
						...tip,
						id: document.id,
						processing: false,
					});
				});
		}
	}

	submit() {
		this.setState({
			processing: true,
		});
		this.request()
			.then(() => toastr.success('Tip saved successfully.'))
			.catch(() => toastr.error('Unable to save Tip.'))
			.finally(() =>
				this.setState({
					processing: false,
				})
			);
	}

	request() {
		const collection = firebase.firestore().collection('tips');
		return this.state.mode === 'Add'
			? ((collection.add({
					title: this.state.title,
					items: this.state.items,
					created_at: firebase.firestore.FieldValue.serverTimestamp(),
					updated_at: firebase.firestore.FieldValue.serverTimestamp(),
			  }) as unknown) as Promise<void>)
			: collection.doc(this.state.id).update({
					title: this.state.title,
					items: this.state.items,
					updated_at: firebase.firestore.FieldValue.serverTimestamp(),
			  });
	}

	promptFile(index: number) {
		this.fileInputRefs[index].current?.click();
	}

	addItem(item: TipItem) {
		const items = this.state.items;
		items.push(item);
		this.fileInputRefs.push(createRef<HTMLInputElement>());
		this.setState({ items });
	}

	setFile(file: File, index: number) {
		const fileReader = new FileReader();
		fileReader.onload = (event) => {
			const item = this.getItem(index);
			item.photo_url = event.target ? String(event.target.result) : 'https://via.placeholder.com/200';
			this.setItem(item, index);
		};
		fileReader.readAsDataURL(file);
	}

	getItem(index: number) {
		return this.state.items[index];
	}

	setItem(value: TipItem, index: number) {
		const items = this.state.items;
		items[index] = value;
		this.setState({ items });
	}

	removeItem(index: number) {
		const items = this.state.items;
		items.splice(index, 1);
		this.fileInputRefs.splice(index, 1);
		this.setState({ items });
	}

	render() {
		return (
			<div className='container pt-3'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						this.submit();
					}}>
					<div className='form-group'>
						<label htmlFor='title'>Title:</label>
						<input
							type='text'
							name='title'
							id='title'
							placeholder='Title'
							className={`form-control form-control-sm ${this.state.processing ? 'disabled' : ''}`}
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
						<label htmlFor='items' className='d-block'>
							Items:
						</label>
						<button
							className='btn btn-dark btn-sm'
							onClick={(e) => {
								e.preventDefault();
								this.addItem({
									title: '',
									description: '',
									photo_url: 'https://via.placeholder.com/200',
								});
							}}>
							Add Item
						</button>
						<div>
							{this.state.items.map((item, index) => (
								<div className='py-2 px-3 shadow border rounded bg-white m-2'>
									<div className='form-group'>
										<h3 className='mt-3'>Item {index + 1}:</h3>
										<div className='text-center'>
											<img
												src={item.photo_url}
												alt=''
												className='img-fluid my-2 clickable'
												style={{
													maxHeight: '200px',
												}}
												onClick={(e) => {
													e.preventDefault();
													this.promptFile(index);
												}}
											/>
										</div>
										<input
											type='file'
											name={`item-file-${index}`}
											id={`item-file-${index}`}
											className='d-none'
											ref={this.fileInputRefs[index]}
											onChange={(e) => {
												e.preventDefault();
												if (e.target.files) {
													const file = e.target.files[0];
													this.setFile(file, index);
												}
											}}
										/>
										<input
											type='text'
											name={`item-title-${index}`}
											placeholder={`Title ${index + 1}`}
											className={`form-control form-control-sm mb-3 ${this.state.processing ? 'disabled' : ''}`}
											disabled={this.state.processing}
											value={item.title}
											onChange={(e) => {
												e.preventDefault();
												const item = this.getItem(index);
												item.title = e.target.value;
												this.setItem(item, index);
											}}
											id={`item-title-${index}`}
										/>
										<textarea
											name={`item-description-${index}`}
											placeholder={`Description ${index + 1}`}
											className={`form-control form-control-sm ${this.state.processing ? 'disabled' : ''}`}
											disabled={this.state.processing}
											value={item.description}
											onChange={(e) => {
												e.preventDefault();
												const item = this.getItem(index);
												item.description = e.target.value;
												this.setItem(item, index);
											}}
											id={`item-description-${index}`}></textarea>
										<button
											className='btn btn-dark btn-sm'
											onClick={(e) => {
												e.preventDefault();
												this.removeItem(index);
											}}>
											Remove
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='form-group'>
						<button
							type='submit'
							className={`btn btn-primary btn-sm ${this.state.processing ? 'disabled' : ''}`}
							disabled={this.state.processing}>
							{this.state.processing ? 'Saving...' : 'Save'}
						</button>
					</div>
				</form>
			</div>
		);
	}
}
