# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание данных

Описание товара:

```
interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```

Список товаров в корзине и итоговая стоимость:

```
interface IBasket {
	items: IProduct[];
	total: number;
}
```

Способы оплаты:

```
type TPaymentMethod = 'cash' | 'card';
```

Описание заказа:

```
interface IOrder {
	items: IProduct[];
	payment: PaymentMethod;
	address: string;
	email: string;
	phone: string;
}
```

Типы ошибок при валидации форм:

```
type FormErrors = Partial<Record<keyof IOrder, string>>;
```

Идентификатор заказа и сумма:

```
interface IOrderResult {
	id: string;
	total: number;
}
```

## Модели данных

Базовая модель, чтобы можно было отличить ее от простых объектов с данными

```
abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {}

    // Сообщить всем что модель поменялась
    emitChanges(event: string, payload?: object) {}
}
```
