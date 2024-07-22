export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IBasket {
	items: IProduct[];
	total: number;
}

export type TPaymentMethod = 'cash' | 'card';

export interface IOrder {
	items: IProduct[];
	payment: TPaymentMethod;
	address: string;
	email: string;
	phone: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
	id: string;
	total: number;
}