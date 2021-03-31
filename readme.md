# Project with (express + sequelize + postgres)
@cleisommais

### Run the app
* Development `npm run dev`
* Debug `npm run debug`
* Unit Test `npm run test`

---

### Commands used to create the app

* `express --git --no-view express-sequelize-postgress`
* `npm install`
* `npm i -D nodemon`
* `npm install --save sequelize`
* `npm install --save pg pg-hstore`
* `sequelize init`
* `sequelize model:create --name users --attributes email:string,password:string`
* `sequelize model:create --name User --attributes "email:[type:string, unique:true, allowNull: false, { validate: { isEmail: true } }`
* `sequelize db:migrate`
* `sequelize-cli seed:generate --name users`
* `sequelize-cli db:seed:all`

---

### Important
You must install before to start the folow tools:
* Node v14.16.0
* Express cli v4.16.1
* Sequelize cli v6.2.0
