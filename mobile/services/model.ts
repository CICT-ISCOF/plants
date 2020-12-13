import { Model as ModelContract } from './contracts';
import firebase from 'firebase';
import 'firebase/firestore';
import toastr from 'toastr';

export default class Model<T extends ModelContract> {
	protected data?: T;
	protected collectionName: string;
	protected collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
	protected notify = true;

	constructor(data?: T, collectionName?: string, notify = true) {
		this.notify = notify;
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

	async create(data: T) {
		if (this.notify) {
			toastr.info('Sending new data to server.');
		}
		const ref = await this.collection.add({
			...data,
			created_at: firebase.firestore.FieldValue.serverTimestamp(),
			updated_at: firebase.firestore.FieldValue.serverTimestamp(),
		});
		const document = await ref.get();
		return {
			...(document.data() as T),
			id: document.id,
		};
	}

	async update() {
		if (this.notify) {
			toastr.info('Sending updated data to server.');
		}
		await this.collection.doc((this.data as T).id as string).update({
			...this.getData(),
			updated_at: firebase.firestore.FieldValue.serverTimestamp(),
		});
		const document = await this.collection
			.doc((this.data as T).id as string)
			.get();
		return {
			...(document.data() as T),
			id: document.id,
		};
	}

	getRef() {
		return this.collection;
	}

	async once() {
		const snapshot = await this.collection.get();
		const data: Array<T> = [];
		snapshot.forEach((document) =>
			data.push({
				...(document.data() as T),
				id: document.id,
			})
		);
		return data;
	}

	get(
		callback: (data: Array<T>) => void,
		onError?: (error: any) => void,
		build?: (
			collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
		) => any
	) {
		return build
			? build(this.collection).onSnapshot(
					(snapshot: Array<any>) => {
						const data: Array<T> = [];
						snapshot.forEach((document) =>
							data.push({
								...(document.data() as T),
								id: document.id,
							})
						);
						callback(data);
					},
					(error: Error) => (onError ? onError(error) : null)
			  )
			: this.collection.onSnapshot(
					(snapshot) => {
						const data: Array<T> = [];
						snapshot.forEach((document) =>
							data.push({
								...(document.data() as T),
								id: document.id,
							})
						);
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
		if (this.notify) {
			toastr.info('Deleting data from server.');
		}
		return await this.collection.doc(id).delete();
	}

	fill(data: T) {
		Object.keys(data).forEach((key) => {
			(this.data as any)[key] = (data as any)[key];
		});
		return this;
	}
}
