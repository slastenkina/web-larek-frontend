import { Form } from './Form';
import { IOrderPayment, PaymentMethod, IOrderContacts } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class OrderPayment extends Form<IOrderPayment> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;
	protected _deliveryAddress: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._paymentCard = container.elements.namedItem(
			'card'
		) as HTMLButtonElement;
		this._paymentCash = container.elements.namedItem(
			'cash'
		) as HTMLButtonElement;
		this._deliveryAddress = container.elements.namedItem(
			'address'
		) as HTMLInputElement;

		this._paymentCard.addEventListener('click', () => {
			this.payment = 'card';
			this.onInputChange('payment', 'card');
		});

		this._paymentCash.addEventListener('click', () => {
			this.payment = 'cash';
			this.onInputChange('payment', 'cash');
		});
	}

	set address(value: string) {
		this._deliveryAddress.value = value;
	}

	set payment(value: PaymentMethod) {
		this._paymentCard.classList.toggle('button_alt-active', value === 'card');
		this._paymentCash.classList.toggle('button_alt-active', value === 'cash');
	}
}

export class OrderContacts extends Form<IOrderContacts> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._email = container.elements.namedItem('email') as HTMLInputElement;
		this._phone = container.elements.namedItem('phone') as HTMLInputElement;
	}

	set phone(value: string) {
		this._email.value = value;
	}

	set email(value: string) {
		this._phone.value = value;
	}
}
