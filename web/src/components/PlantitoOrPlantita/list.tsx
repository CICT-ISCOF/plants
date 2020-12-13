import React, { Component } from 'react';
import { Plantito as Contract } from '../../services/contracts';

import { Link, RouteComponentProps } from 'react-router-dom';
import state from '../../services/state';
import toastr from 'toastr';
import Model from '../../services/model';
import Plantito from './plantito';

type State = {
	plantitos: Array<Contract>;
};

export default class List extends Component<RouteComponentProps, State> {
	service = new Model<Contract>(undefined, 'plantitos');

	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			plantitos: [],
		};
	}

	componentDidMount() {
		this.service.get((plantitos) => this.setState({ plantitos }));
	}

	remove(index: number) {
		const plantito = this.state.plantitos[index];
		const modalID = `#deletePlantitoModal${plantito.id}`;
		const modal = $(modalID) as any;
		modal.on('hidden.bs.modal', async () => {
			try {
				await this.service.delete(plantito.id as string);
				toastr.success('Plantito deleted successfully.');
			} catch (error) {
				console.log(error);
				toastr.error('Unable to delete Plantito.');
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
					{this.state.plantitos.length > 0 ? (
						this.state.plantitos.map((plantito, index) => (
							<Plantito
								plantito={plantito}
								index={index}
								remove={this.remove.bind(this)}
								key={index}
								{...this.props}
							/>
						))
					) : (
						<div className='col-12 text-center'>No Data</div>
					)}
				</div>
			</div>
		);
	}
}
