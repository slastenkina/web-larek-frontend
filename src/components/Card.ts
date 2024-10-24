import { Component } from './base/Component';
import { ICard } from '../types';
import { ensureElement } from '../utils/utils';
import { categories } from '../utils/constants';
import { IEvents } from './base/events';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _price: HTMLSpanElement;
	protected _category: HTMLSpanElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
		this._button = container.querySelector(`.card__button`);
		this._description = container.querySelector(`.card__text`);
		this._price = ensureElement<HTMLElement>(`.card__price`, container);
		this._category = container.querySelector(`.card__category`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._description.replaceWith(
				...value.map((str) => {
					const descTemplate = this._description.cloneNode() as HTMLElement;
					this.setText(descTemplate, str);
					return descTemplate;
				})
			);
		} else {
			this.setText(this._description, value);
		}
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
	}

	get price(): number {
		return Number(this._price.textContent);
	}

	set category(value: string) {
		this.setText(this._category, value);

		this._category.className = '';
		const className = `card__category`;
		const categoryClassName = categories.get(value);
		this._category.classList.add(className, `${className}${categoryClassName}`)
	}

	get category() {
		return this._category.textContent || '';
	}
}

export interface IBasketItem {
	title: string;
	price: number;
}

export class BasketItem extends Component<BasketItem> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, index: number, actions?: ICardActions) {
		super(container);

		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this.setText(this._index, index + 1);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = container.querySelector('.card__button');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			}
		}
	}

	set index(value: number) {
		this.setText(this._index, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
		} else {
			this.setText(this._price, `${value.toString()} синапсов`);
		}
	}
}
