import React, { Component } from 'react';
import { Tip } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import db from '../../firebase/firestore';
import state from '../../services/state';
import toastr from 'toastr';

type State = {
	tips: Array<Tip>;
};

export default class List extends Component<RouteComponentProps, State> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			tips: [],
		};
	}

	componentDidMount() {
		const collection = db.collection('tips');
		collection.onSnapshot((snapshot) => {
			const tips: Array<Tip> = [];
			snapshot.forEach((document) =>
				tips.push({
					...(document.data() as Tip),
					id: document.id,
				})
			);
			this.setState({ tips });
		});
	}

	remove(index: number) {
		const tip = this.state.tips[index];
		const modalID = `#deleteTipModal${tip.id}`;
		const modal = $(modalID) as any;
		modal.on('hidden.bs.modal', async () => {
			const document = db.collection('tips').doc(tip.id);
			try {
				await document.delete();
				toastr.success('Tip deleted successfully.');
			} catch (error) {
				console.log(error);
				toastr.error('Unable to delete tip.');
			}
		});
		modal.modal('hide');
	}

	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	render() {
		return (
			<div className='container pt-3'>
				<div className='d-flex'>
					<Link
						to={this.path('add')}
						className='btn btn-secondary btn-sm'
					>
						Add
					</Link>
				</div>
				<div className='row'>
					{this.state.tips.map((tip, index) => (
						<div
							className='col-sm-12 p-3 border rounded shadow'
							data-id={tip.id}
							key={index}
						>
							<h3 className='mb-0'>{tip.title}</h3>
							<div className='d-flex'>
								{state.has('user') ? (
									<Link
										className='btn btn-info btn-sm mx-1'
										to={this.path(`${tip.id}/edit`)}
									>
										Edit
									</Link>
								) : null}
								{state.has('user') ? (
									<a
										className='btn btn-danger btn-sm mx-1'
										href={this.path(`/${tip.id}/delete`)}
										data-toggle='modal'
										data-target={`#deleteTipModal${tip.id}`}
									>
										Delete
									</a>
								) : null}
								{state.has('user') ? (
									<div
										className='modal fade'
										id={`deleteTipModal${tip.id}`}
										tabIndex={-1}
										role='dialog'
										aria-labelledby={`deleteTipModalLabel${tip.id}`}
										aria-hidden='true'
									>
										<div
											className='modal-dialog modal-dialog-centered'
											role='document'
										>
											<div className='modal-content'>
												<div className='modal-header'>
													<h5
														className='modal-title'
														id={`deleteCategoryModalLabel${tip.id}`}
													>
														Delete Tip
													</h5>
													<button
														type='button'
														className='close'
														data-dismiss='modal'
														aria-label='Close'
													>
														<span aria-hidden='true'>
															&times;
														</span>
													</button>
												</div>
												<div className='modal-body'>
													Are you sure you want to
													delete {tip.title}?
												</div>
												<div className='modal-footer'>
													<button
														type='button'
														className='btn btn-danger btn-sm'
														onClick={(e) => {
															e.preventDefault();
															this.remove(index);
														}}
													>
														Delete
													</button>
													<button
														type='button'
														className='btn btn-secondary btn-sm'
														data-dismiss='modal'
													>
														Close
													</button>
												</div>
											</div>
										</div>
									</div>
								) : null}
							</div>
							{tip.items.length > 0
								? tip.items.map((item, index) => (
										<div className='card'>
											<div className='card-body'>
												<img
													src={item.photo_url}
													alt=''
													className='card-img-top'
													style={{
														maxHeight: '200px',
													}}
												/>
												<h4>{item.title}</h4>
												<div className='card-text'>
													{item.description}
												</div>
											</div>
										</div>
								  ))
								: null}
						</div>
					))}
				</div>
			</div>
		);
	}
}
