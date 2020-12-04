export interface Model {
	id?: string;
	created_at?: {
		nanoseconds: number;
		seconds: number;
	};
	updated_at?: {
		nanoseconds: number;
		seconds: number;
	};
}

export interface Category extends Model {
	title: string;
	photo_url: string;
}

export interface Tip extends Model {
	title: string;
	items: Array<TipItem>;
}

export interface TipItem {
	title: string;
	description: string;
	photo_url: string;
}

export interface Plant extends Model {
	name: string;
	category_id: string;
	photo_url: string;
	month: string;
}

export interface Pest extends Model {
	name: string;
	affected_plant_ids: Array<string>;
	photo_url: string;
}

export interface Disease extends Model {
	title: string;
	symptoms: Array<string>;
	affected_plant_ids: Array<string>;
	photo_url: string;
}

export interface Preparation extends Model {
	title: string;
	steps: Array<string>;
	type: string;
	plant_id: string;
}
