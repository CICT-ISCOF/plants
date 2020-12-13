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

export interface PlantCompanion {
	type: string;
	plant_id: string;
}

export interface Plant extends Model {
	name: string;
	category_id: string;
	photo_url: string;
	schedule_image_url: string;
	images: Array<string>;
	months: Array<string>;
	companions: Array<PlantCompanion>;
	description: string;
	layouts: Array<string>;
	preparations: Array<Preparation>;
}

export interface Pest extends Model {
	name: string;
	affected_plant_ids: Array<string>;
	photo_url: string;
	description: string;
}

export interface Disease extends Model {
	title: string;
	symptoms: Array<string>;
	affected_plant_ids: Array<string>;
	photo_url: string;
	description: string;
}

export interface Preparation {
	title: string;
	steps: Array<string>;
	type: string;
	description: string;
}

export interface PlantitoItem {
	photo_url: string;
	body: string;
}

export interface PlantitoGuideItem {
	title: string;
	description: string;
}

export interface PlantitoGuide {
	title: string;
	description: string;
	items: Array<PlantitoGuideItem>;
}

export interface PlantitoVariety {
	name: string;
	photo_url: string;
}

export interface Plantito extends Model {
	photo_url: string;
	type: 'Plantito' | 'Plantita';
	name: string;
	description: string;
	items: Array<PlantitoItem>;
	guides: Array<PlantitoGuide>;
	varieties: Array<PlantitoVariety>;
}
