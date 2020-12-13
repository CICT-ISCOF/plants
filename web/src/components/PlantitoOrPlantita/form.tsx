import React, { Component, createRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import 'firebase/firestore';
import {
	PlantitoGuide,
	PlantitoItem,
	PlantitoVariety,
	Plantito,
} from '../../services/contracts';
import toastr from 'toastr';
import Model from '../../services/model';
import Item from './form/item';
import Guide from './form/guide';
import Variety from './form/variety';

type State = {
	id?: string;
	photo_url: string;
	type: 'Plantito' | 'Plantita';
	name: string;
	description: string;
	items: Array<PlantitoItem>;
	guides: Array<PlantitoGuide>;
	varieties: Array<PlantitoVariety>;
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
	service = new Model<Plantito>(undefined, 'plantitos');
	ref = createRef<HTMLInputElement>();
	reader = new FileReader();

	itemRefs: Array<React.RefObject<HTMLInputElement>> = [];

	constructor(props: RouteComponentProps<Params>) {
		super(props);
		this.state = {
			id: undefined,
			mode: 'Add',
			type: 'Plantita',
			name: '',
			description: '',
			guides: [],
			varieties: [],
			photo_url: 'https://via.placeholder.com/200',
			items: [],
			processing: false,
		};
	}

	componentDidMount() {
		const fragments = this.props.match.path.split('/');
		if (fragments.includes('edit')) {
			const id = this.props.match.params.id;
			this.service.find(id).then((plantito) =>
				this.setState({
					...plantito,
					mode: 'Edit',
					processing: false,
				})
			);
		}
		this.reader.onload = (event) => {
			this.setState({ photo_url: String(event.target?.result) });
		};
	}

	submit() {
		this.setState({
			processing: true,
		});
		this.request()
			.then((plantito) =>
				toastr.success(`${plantito.type} saved successfully.`)
			)
			.catch((error) => {
				console.log(error);
				toastr.error(`Unable to save ${this.state.type}.`);
			})
			.finally(() =>
				this.setState({
					processing: false,
				})
			);
	}

	getItem(index: number) {
		return this.state.items[index];
	}

	setItem(item: PlantitoItem, index: number) {
		const items = this.state.items;
		items.splice(index, 1, item);
		this.setState({ items });
	}

	addItem(item: PlantitoItem) {
		const items = this.state.items;
		items.push(item);
		this.itemRefs.push(createRef());
		this.setState({ items });
	}

	promptItemFile(index: number) {
		const ref = this.itemRefs[index];
		ref.current?.click();
	}

	setItemFile(file: File, index: number) {
		const reader = new FileReader();
		reader.onload = (event) => {
			const item = this.getItem(index);
			item.photo_url = String(event.target?.result);
			this.setItem(item, index);
		};
		reader.readAsDataURL(file);
	}

	removeItem(index: number) {
		const items = this.state.items;
		items.splice(index, 1);
		this.itemRefs.splice(index, 1);
		this.setState({ items });
	}

	addGuide(guide: PlantitoGuide) {
		const guides = this.state.guides;
		guides.push(guide);
		this.setState({ guides });
	}

	getGuide(index: number) {
		return this.state.guides[index];
	}

	setGuide(guide: PlantitoGuide, index: number) {
		const guides = this.state.guides;
		guides.splice(index, 1, guide);
		this.setState({ guides });
	}

	removeGuide(index: number) {
		const guides = this.state.guides;
		guides.splice(index, 1);
		this.setState({ guides });
	}

	addVariety(variety: PlantitoVariety) {
		const varieties = this.state.varieties;
		varieties.push(variety);
		this.setState({ varieties });
	}

	getVariety(index: number) {
		return this.state.varieties[index];
	}

	setVariety(variety: PlantitoVariety, index: number) {
		const varieties = this.state.varieties;
		varieties.splice(index, 1, variety);
		this.setState({ varieties });
	}

	removeVariety(index: number) {
		const varieties = this.state.varieties;
		varieties.splice(index, 1);
		this.setState({ varieties });
	}

	request() {
		return new Model<Plantito>(
			{
				id: this.state.id,
				type: this.state.type,
				name: this.state.name,
				description: this.state.description,
				guides: this.state.guides,
				varieties: this.state.varieties,
				photo_url: this.state.photo_url,
				items: this.state.items,
			},
			'plantitos'
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
					<div className='text-center my-2'>
						<input
							type='file'
							name=''
							ref={this.ref}
							id=''
							className='d-none'
							onChange={(e) => {
								e.preventDefault();
								if (
									e.target.files &&
									e.target.files.length > 0
								) {
									this.reader.readAsDataURL(
										e.target.files[0]
									);
								}
							}}
						/>
						<img
							src={this.state.photo_url}
							alt=''
							style={{ maxHeight: '200px' }}
							className='img-fluid clickable'
							onClick={(e) => {
								e.preventDefault();
								this.ref.current?.click();
							}}
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
						<label htmlFor='type'>Type:</label>
						<select
							name=''
							id=''
							className={`form-control form-control-sm ${
								this.state.processing ? 'disabled' : ''
							}`}
							disabled={this.state.processing}
							onChange={(e) => {
								const value = e.target.value as
									| 'Plantito'
									| 'Plantita';
								this.setState({ type: value });
							}}
						>
							<option value='Plantito'>Plantito</option>
							<option value='Plantita'>Plantita</option>
						</select>
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
						<label htmlFor='items' className='d-block'>
							Items:
						</label>
						<button
							className='btn btn-dark btn-sm'
							onClick={(e) => {
								e.preventDefault();
								this.addItem({
									body: '',
									photo_url:
										'https://via.placeholder.com/200',
								});
							}}
						>
							Add Item
						</button>
						<div>
							{this.state.items.map((item, index) => (
								<Item
									{...this.props}
									{...this.state}
									item={item}
									setItem={this.setItem.bind(this)}
									getItem={this.getItem.bind(this)}
									setItemFile={this.setItemFile.bind(this)}
									fileRef={this.itemRefs[index]}
									index={index}
									promptItemFile={this.promptItemFile.bind(
										this
									)}
									removeItem={this.removeItem.bind(this)}
									key={index}
								/>
							))}
						</div>
					</div>
					<div className='form-group'>
						<label htmlFor='guides' className='d-block'>
							Guides:
						</label>
						<button
							className='btn btn-dark btn-sm'
							onClick={(e) => {
								e.preventDefault();
								this.addGuide({
									title: '',
									description: '',
									items: [],
								});
							}}
						>
							Add Guide
						</button>
						<div>
							{this.state.guides.map((guide, index) => (
								<Guide
									{...this.props}
									{...this.state}
									index={index}
									guide={guide}
									setGuide={this.setGuide.bind(this)}
									getGuide={this.getGuide.bind(this)}
									removeGuide={this.removeGuide.bind(this)}
									key={index}
								/>
							))}
						</div>
					</div>
					<div className='form-group'>
						<label htmlFor='varieties' className='d-block'>
							Varieties:
						</label>
						<button
							className='btn btn-dark btn-sm'
							onClick={(e) => {
								e.preventDefault();
								this.addVariety({
									name: '',
									photo_url:
										'https://via.placeholder.com/200',
								});
							}}
						>
							Add Variety
						</button>
						<div>
							{this.state.varieties.map((variety, index) => (
								<Variety
									{...this.props}
									{...this.state}
									variety={variety}
									index={index}
									key={index}
									getVariety={this.getVariety.bind(this)}
									setVariety={this.setVariety.bind(this)}
									removeVariety={this.removeVariety.bind(
										this
									)}
								/>
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
