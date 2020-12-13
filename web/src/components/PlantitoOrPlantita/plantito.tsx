import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Plantito as Model } from '../../services/contracts';
import Controls from '../Controls';
import Guide from './guide';
import Item from './item';
import Variety from './variety';

interface Props extends RouteComponentProps {
	plantito: Model;
	remove: (index: number) => void;
	index: number;
}

export default class Plantito extends Component<Props> {
	path(url: string) {
		return `${this.props.match.path}${url}`;
	}

	render() {
		const plantito = this.props.plantito;
		return (
			<div className='col-sm-12 p-3' data-id={plantito.id}>
				<div className='card'>
					<img
						src={plantito.photo_url}
						alt=''
						className='card-img-top'
					/>
					<div className='card-body'>
						<h3 className='card-title'>{plantito.name}</h3>
						<b className='card-text'>Type:</b>
						<p className='card-text'>{plantito.type}</p>
						<p className='card-text'>{plantito.description}</p>
						{plantito.items.length > 0 ? (
							<div className='p-3 shadow rounded mx-2 my-3 border'>
								<h3>Items</h3>
								{plantito.items.map((item, index) => (
									<Item item={item} key={index} />
								))}
							</div>
						) : null}
						{plantito.guides.length > 0 ? (
							<div className='p-3 shadow rounded mx-2 my-3 border'>
								<h3>Guides</h3>
								{plantito.guides.map((guide, index) => (
									<Guide guide={guide} key={index} />
								))}
							</div>
						) : null}
						{plantito.guides.length > 0 ? (
							<div className='p-3 shadow rounded mx-2 my-3 border'>
								<h3>Varieties</h3>
								{plantito.varieties.map((variety, index) => (
									<Variety variety={variety} key={index} />
								))}
							</div>
						) : null}
					</div>
					<div className='card-footer'>
						<Controls
							model={plantito}
							{...this.props}
							name='Plantito'
						/>
					</div>
				</div>
			</div>
		);
	}
}
