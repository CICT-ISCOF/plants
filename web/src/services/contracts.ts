export interface Model {
	id: string;
	created_at: {
		nanoseconds: number;
		seconds: number;
	};
	updated_at: {
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
