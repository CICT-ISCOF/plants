import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageItem = {
	[key: string]: any;
};

export type ChangeEvent<T> = (value: T, thisArg?: State) => void;

export type Listeners = {
	[key: string]: Array<ChangeEvent<any>>;
};

export class State {
	storage = AsyncStorage;
	key = 'react-state-key';
	listeners: Listeners = {};
	data: StorageItem = {};

	constructor() {
		this.getAll().then((data) => {
			this.data = data;
		});
	}

	async getAll(): Promise<StorageItem> {
		try {
			const data = await this.storage.getItem(this.key);
			return data ? JSON.parse(data) : {};
		} catch (error) {
			return {};
		}
	}

	async setAll(data: StorageItem) {
		this.data = data;
		await this.storage.setItem(this.key, JSON.stringify(data));
		return this;
	}

	async has(key: string) {
		return key in (await this.getAll());
	}

	get<T = any>(
		key: string,
		fallbackValue?: T,
		callback?: (value: T) => void
	): T {
		this.getAll().then((data) => {
			if (callback) {
				callback(data[key]);
			}
		});
		if (key in this.data) {
			return this.data[key];
		}
		return fallbackValue ? fallbackValue : null;
	}

	async set(key: string, value: any) {
		const data = await this.getAll();
		data[key] = value;
		await this.setAll(data);
		this.dispatch(key, value);
		return this;
	}

	remove(key: string) {
		if (this.has(key)) {
			const data = this.getAll();
			delete data[key];
			this.setAll(data);
		}
		return this;
	}

	dispatch<T>(key: string, value: T) {
		if (key in this.listeners) {
			this.listeners[key].forEach((callback) => callback(value, this));
		}
		return this;
	}

	listen<T>(key: string, callback: ChangeEvent<T>) {
		if (!(key in this.listeners)) {
			this.listeners[key] = [];
		}
		return this.listeners[key].push(callback) - 1;
	}

	unlisten(key: string, index: number) {
		if (!(key in this.listeners)) {
			return;
		}
		this.listeners[key].splice(index, 1);
	}
}

export default new State();
