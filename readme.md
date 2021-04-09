# Project with (Node.j + Express + Sequelize ORM + PostgreSQL DB + Docker)
@cleisommais

Project designed to simulate the Trello tool, was created several unit tests to validate all endpoints created

---

### Run the app
* Development `npm run dev`
* Debug `npm run debug`
* Unit Test `npm run test`
* Build `npm run build`

---

### Start project using docker-compose
* Inside of the root project run `docker-compose up -d`
Access using `localhost:3000`

---

### Important comandas load the first data to database
* Create database specified by conf `sequelize db:create`
* Drop database specified by conf `sequelize db:drop`
* Add tables, indexes and constraints `sequelize db:migrate`
* Remove all tables and its dependencies `sequelize db:migrate:undo:all`
* Insert the data to database `sequelize-cli db:seed:all`
* Remove all data that you imported/inserted bevore `sequelize-cli db:seed:undo:all`

---

### Important
You must install before to start the folow tools:
* Node v14.16.0
* Express cli v4.16.1
* Sequelize cli v6.2.0
