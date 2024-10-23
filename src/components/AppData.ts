import { Model } from './base/Model';
import {
	FormErrors,
	IAppState,
	ICard,
	IOrder,
	IOrderForm,
	PaymentMethod,
} from '../types';

export type CatalogChangeEvent = {
	catalog: ICard[];
};

export class AppState extends Model<IAppState> {
	catalog: ICard[];
	loading: boolean;
	basket: ICard[] = [];
	order: IOrder = {
		email: '',
		phone: '',
		items: [],
		payment: '',
		total: 0,
		address: '',
	};
	preview: string | null;
	formErrors: FormErrors = {};

	setCatalog(items: ICard[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: ICard) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	getStatus(item: ICard) {
		if (!this.basket.some((card) => card.id == item.id)) {
			return 'Купить';
		} else {
			return 'Убрать';
		}
	}

	addToBasket(item: ICard) {
		this.basket.push(item);
		this.emitChanges('counter:changed', this.basket);
		this.emitChanges('basket:changed', this.basket);
	}

	deleteFromBasket(item: ICard) {
		this.basket = this.basket.filter((card) => card.id !== item.id);
		this.emitChanges('basket:changed');
	}

	toggleBasket(item: ICard) {
		return !this.basket.some((card) => card.id === item.id)
			? this.addToBasket(item)
			: this.deleteFromBasket(item);
	}

	clearBasket() {
		this.basket = [];
		this.emitChanges('basket:changed');
	}

	clearOrder() {
		this.order = {
			total: 0,
			items: [],
			email: '',
			phone: '',
			address: '',
			payment: '',
		};
	}

	getOrderItems(): ICard[] {
		return this.basket;
	}

	setPaymentMethod(method: PaymentMethod) {
		this.order.payment = method;
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		if (field === 'payment') {
			this.setPaymentMethod(value as PaymentMethod);
		} else {
			this.order[field] = value;
		}

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}

		if (!this.order.address) {
			errors.address = `Необходимо указать адрес`;
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
