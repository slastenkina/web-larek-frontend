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

Описание товара
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

Список товаров в корзине и итоговая стоимость
```
interface IBasket {
	items: IProduct[];
	total: number;
}
```

Способы оплаты
```
type TPaymentMethod = 'cash' | 'card';
```

Описание заказа
```
interface IOrder {
	items: IProduct[];
	payment: PaymentMethod;
	address: string;
	email: string;
	phone: string;
}
```

Типы ошибок при валидации форм
```
type FormErrors = Partial<Record<keyof IOrder, string>>;
```

Идентификатор заказа и сумма
```
interface IOrderResult {
	id: string;
	total: number;
}
```

Главная страница
```
interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
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

## Классы представления

Базовый компонент

```
abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Переключить класс
    toggleClass(element: HTMLElement, className: string, force?: boolean): void;

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: string): void;

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean): void;

    // Скрыть
    protected setHidden(element: HTMLElement): void;

    // Показать
    protected setVisible(element: HTMLElement): void;

    // Установить изображение с алтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string): void;

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement
}
```

Класс главной страницы
```
class Page extends Component<IPage> {
    //Внутренние элементы
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents)
    //сеттер для счётчика товаров в корзине
    set counter(value: number) 

    //сеттер для товаров на странице
    set catalog(items: HTMLElement[]) 

    //сеттер для блока прокрутки
    set locked(value: boolean)
}
```

Класс формы заказа
```
class Order extends Form<IOrder> {
    constructor(container: HTMLFormElement, events: IEvents) 

    set phone(value: string)

    set email(value: string) 
}
```