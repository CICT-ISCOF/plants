import { Model as ModelContract } from './contracts';
import firebase from 'firebase';
import 'firebase/firestore';

export default class Model<T extends ModelContract> {
	protected data?: T;
	protected collectionName: string;
	protected collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

	constructor(data?: T, collectionName?: string) {
		this.data = data;
		this.collectionName = collectionName || '';
		this.collection = firebase.firestore().collection(this.collectionName);
	}

	getData(): T {
		const data = {
			...this.data,
		} as any;
		delete data.id;
		return data;
	}

	async save() {
		if (!this.data) {
			throw new Error('There is no data.');
		}
		if (!this.data.id) {
			return await this.create(this.getData());
		} else {
			return await this.update();
		}
	}

	create(data: T) {
		return this.collection.add({
			...data,
			created_at: firebase.firestore.FieldValue.serverTimestamp(),
			updated_at: firebase.firestore.FieldValue.serverTimestamp(),
		});
	}

	update() {
		return this.collection.doc((this.data as T).id as string).update({
			...this.getData(),
			updated_at: firebase.firestore.FieldValue.serverTimestamp(),
		});
	}

	get(callback: (data: Array<T>) => void, onError?: (error: any) => void) {
		this.collection.onSnapshot(
			(snapshot) => {
				const data: Array<T> = [];
				snapshot.forEach((document) => {
					data.push({
						...(document.data() as T),
						id: document.id,
					});
				});
				callback(data);
			},
			(error) => (onError ? onError(error) : null)
		);
	}

	async find(id: string): Promise<T> {
		return await this.collection
			.doc(id)
			.get()
			.then((document) => ({
				...(document.data() as T),
				id: document.id,
			}));
	}

	async delete(id: string) {
		return await this.collection.doc(id).delete();
	}

	fill(data: T) {
		Object.keys(data).forEach((key) => {
			(this.data as any)[key] = (data as any)[key];
		});
		return this;
	}
}
