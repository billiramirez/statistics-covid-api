# Statistics Covid-19

## This API will retrieve endpoints for Covid-19 Status, you can add your own record if you are authorized to do it.

## Stack for this API

#### Programming Language

- Javascript and [Typescript](https://www.typescriptlang.org/)

#### Web Server

- [Nodejs](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/es/)

#### API Design

- [Express-OpenAPI](https://www.npmjs.com/package/express-openapi)
- [Swagger](https://swagger.io/)

#### Authentication

- [PassportJS](http://www.passportjs.org/)
- [JWT](https://jwt.io/)

#### Database and ORM

- [MongoDB](https://www.mongodb.com/es)
- [Mongoose](https://mongoosejs.com/)
- [Mongo Atlas](https://www.mongodb.com/es/cloud/atlas)

#### Deployment

- [Heroku](https://www.heroku.com/)

## Run this Project Locally

1. Clone the repo on your computer, please make sure you have installed Nodejs, Yarn and Git on your machine.

```bash
https://github.com/billiramirez/statistics-covid-api.git
```

2. Install Dependencies

```bash
yarn install
```

3. Create a `.env` file in the root of your project, you'll find a `.env.example` that will looks this:

```
X_RAPID_API_HOST=
X_RAPID_API_KEY=
API_X_RAPID_API_URL=
MONGO_USER=
MONGO_PASSWORD=
AUTH_TOKEN=
```

4. Run the Project

```bash
  yarn start:dev
```

You need to seed the database with initial data, you can go to `http://localhost:4000/v1/statistcs` to sync data, for this endpoint you'll need to be logged in.

If you need to sign up, you can go to: `http://localhost:4000/v1/auth/signup` to create your account, and this will provide you a `token` you can use for performing this operation.

Then you can try this endpoint `http://localhost:4000/v1/statistcs`

## Desing of the API

Since this project is using the Open API Specification along with Express Open APi, this will help you to interact with the endpoints. Having the project running locally you can import the API Documentation in POSTMAN as `Link`, paste this URL: `http://localhost:4000/v1/openapi.json` and then import it, this will create a collection for you, out of the box with the available endpoints. You'll be ready to go with this setup.

![Paste URL](https://res.cloudinary.com/billiramirez/image/upload/v1630472161/7d1a7970-3e0d-480a-af41-17e1e54cfddf_jwbpmo.png)
![Collection to import](https://res.cloudinary.com/billiramirez/image/upload/v1630472161/Screenshot_at_Sep_01_00-55-04_mmhuql.png)

This will generate the Collection for you:

![Colleciton](https://res.cloudinary.com/billiramirez/image/upload/v1630472161/Screenshot_at_Sep_01_00-55-43_zwmbsr.png)

You can also paste that openapi.json url to this URL: https://petstore.swagger.io/

![Swagger UI Collection](https://res.cloudinary.com/billiramirez/image/upload/v1630472418/Screenshot_at_Sep_01_01-00-08_ckbfgq.png)

## Deployment

You can deploy this app to your favorite hosting provider, for this demo we're using Heroku, just make sure to provide the environemnt variables
