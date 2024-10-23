// лот из постмана

// "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// "description": "Если планируете решать задачи в тренажёре, берите два.",
// "image": "/5_Dots.svg",
// "title": "+1 час в сутках",
// "category": "софт-скил",
// "price": 750

export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	button: string;
}

export interface IAppState {
	catalog: ICard[];
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
}

export type PaymentMethod = 'card' | 'cash';

export interface IOrderPayment {
	payment: string;
	address: string;
}

export interface IOrderContacts {
	email: string;
	phone: string;
}

export interface IOrderForm extends IOrderPayment, IOrderContacts {}

export interface IOrder extends IOrderForm {
	items: string[];
	total: number;
	payment: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
	id: string;
	total: number;
}
