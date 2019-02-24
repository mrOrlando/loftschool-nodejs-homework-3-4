# Домашнее задание курса Node.js (3 и 4)

![Скриншот проекта](https://loftschool.com/uploads/course_logos/nodejs.svg?v=1513152963369)

## Как использовать

Инструкции как запустить проект:

1. git clone https://github.com/mrOrlando/loftschool-nodejs-homework-3-4
2. yarn install
3. yarn run server

#### На странице login.html - POST запрос url = '/login'

Отправляет на сервер поля

```
    {
      email,
      password
    }
```

---

#### На странице index.html - POST запрос url = '/'

Отправляется на сервер поля

```
    {
      name - 'Имя отправителя',
      email - 'Email пользователя',
      message - 'Сообщение от пользователя'
    }
```

---

#### На странице admin.html - POST запрос url = '/admin/upload'

Отправляется FormData объект на сервер с картинкой товара и описанием

```js
    в поле photo - Картинка товара
    в поле name - Название товара
    в поле price - Цена товара
```

#### POST запрос url = '/admin/skills'

Отправляется поля на сервер с значением скиллов

```js
    в поле age - Возраст
    в поле concerts - Концертов
    в поле cities - Число городов
    в поле years - Лет на сцене
```

##### Домашние задание №3 - реализовать серверную часть на [Express.js](http://expressjs.com/ru/)

##### Домашние задание №4 - реализовать серверную часть на [Koa.js](http://koajs.com/)

Данные хранить на сервере в JSON файле, можно использовать пакет [nconf](https://www.npmjs.com/package/nconf) или [LowDB](https://github.com/typicode/lowdb) на свое усмотрение

### Примечание

- jQuery есть и можно использовать
- JS не используется для отправки форм, все выполняется нативно браузером. Хотите пишите самостоятельно клиентский код
- Для ответов с сервера есть поле .status в каждой форме. Чтобы туда отправлять ответы от сервера используйте пакет [connect-flash](https://www.npmjs.com/package/connect-flash)
- проект можно немного подпиливать под себя
