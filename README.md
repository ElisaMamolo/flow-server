### Flow

#### Description of the project

Flow is an app for supporting users in tracking their acquariums nutrient values by having the possibility to input those values in a form of a log. Moreover, specific charts allow to visualize data and present them in another form to the user.

#### User Stories

- As a user visiting Flow I would like to CRUD acquariums

- As a user visiting Flow I would like to CRUD logs

- As a user visiting Flow I would like to Signup and create user

- As a user visiting Flow I would like to Login/logout + handling token

- As a user visiting Flow I would like to be able to CRUD on logs

- As a user visiting Flow I would like to be able to CRUD on acquariums

#### Technologies Used

:computer:

- Express
- MongoDB & Mongoose
- MongoDB Atlas - db deployment
- Heroku - server deployment
- Netlify - client deployment
- Bootstrap
- Recharts

#### Models

1 user type\
2 more models user type\

##### User Model

Pregenerated with ironlauncher and enhanced\
Properties:

- username: { type: String, required: true, unique: true,},
- password: String,
- email: { type: String, unique: true, required: true },
- acquariums: [{ type: Schema.Types.ObjectId, ref: "Acquarium" }],

##### Acquarium Model

Properties:\

- user: { type: Schema.Types.ObjectId, ref: "User" },
- name: String,
- liters: Number,
- started: Date,
- logs: [{ type: Schema.Types.ObjectId, ref: "Log" }],

##### Log Model

Properties:\

- acquarium: { type: Schema.Types.ObjectId, ref: "Acquarium" },
- comments: String,
- measurements: [
  {
  timestamp: Date, //see if this needs to change
  ph: Number,
  temperature: Number,
  ammonia: Number,
  nitrite: Number,
  nitrate: Number,
  phosphate: Number,
  salinity: Number,
  alkalinity: Number,
  calcium: Number,
  magnesium: Number,
  },
  ],

#### Server routes table(Method, Route or URL, Description as columns)

|     | route                | description                                                                                                                      |     |
| --- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --- |
|     | ---auth---           | -------------------------------------------------------------------------------------------------------------------------------- |     |
|     | /signup              | get and post for showing the form and to signup                                                                                  |     |
|     | /login               | get and post for showing the form and to login                                                                                   |     |
|     | /verify              | Used to verify JWT stored on the client                                                                                          |     |
|     |                      |                                                                                                                                  |     |
|     | ---acquarium---      | -------------------------------------------------------------------------------------------------------------------------------- |     |
|     | /                    | get acquariums and handle query params userid to return filtered acquariums by userid                                            |     |
|     | /:id                 | get by id for edit acquarium                                                                                                     |     |
|     | /                    | post to create an acquarium                                                                                                      |     |
|     | /:id                 | put to modify an acquarium                                                                                                       |     |
|     | /:id                 | delete an acquarium                                                                                                              |     |
|     | ---logs---           | -------------------------------------------------------------------------------------------------------------------------------- |     |
|     | /:id                 | get log                                                                                                                          |     |
|     | /                    | post a log and update acquarium                                                                                                  |     |
|     | /:logid/:acquariumid | put log and update acquarium                                                                                                     |     |
|     | /:logid/:acquariumid | delete log and update acquarium                                                                                                  |     |

#### Project Link

https://flow-acquarium-app.herokuapp.com/

#### Future Work

:wrench:

- This is only an mvp, there are some details in the api that could be improved, like the validation of the forms could be written in a more elegant way.

:wrench:

#### Resources

- Ironlauncher npm package - for generating the structure of the project and for handling auth routes

#### Team members

Elisa

#### This is a learning project, if anything needs to be removed please reach out and it will be removed right away.
