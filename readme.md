# Project with (express + sequelize + postgres)
@cleisommais

### Run the app
* Development `npm run dev`
* Debug `npm run debug`
* Unit Test `npm run test`

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
