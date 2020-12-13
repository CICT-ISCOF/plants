import React, { Component } from 'react';
import { Tip } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import db from '../../firebase/firestore';
import state from '../../services/state';
import toastr from 'toastr';
import Controls from '../Controls';

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
					{this.state.tips.length > 0 ? (
						this.state.tips.map((tip, index) => (
							<div
								className='col-sm-12 p-3'
								data-id={tip.id}
								key={index}
							>
								<div className='border rounded shadow p-3'>
									<h3 className='mb-0'>{tip.title}</h3>
									<Controls
										{...this.props}
										model={tip}
										remove={this.remove.bind(this)}
										index={index}
										name='Tip'
									/>
									{tip.items.length > 0
										? tip.items.map((item, index) => (
												<div
													className='card'
													key={index}
												>
													<div className='card-body'>
														<img
															src={item.photo_url}
															alt=''
															className='card-img-top'
															style={{
																maxHeight:
																	'200px',
															}}
														/>
														<h4>{item.title}</h4>
														<p className='card-text'>
															{item.description}
														</p>
													</div>
												</div>
										  ))
										: null}
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
