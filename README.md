# Travel Club

[![Known Vulnerabilities](https://snyk.io/test/github/lucasweng/yelp-camp/badge.svg)](https://snyk.io/test/github/lucasweng/yelp-camp)
[![NSP Status](https://nodesecurity.io/orgs/webdevprojects/projects/e3247e54-2256-44ff-9c8a-e4e087bd49fa/badge)](https://nodesecurity.io/orgs/webdevprojects/projects/e3247e54-2256-44ff-9c8a-e4e087bd49fa)

> This application is a simple travel guide that is created with MongoDB, Express, EJS and Node.js.

## Live Demo

To see the app in action, go to [https://travelclub.com](https://lit-forest-10880.herokuapp.com/)

## Features

- Authentication:

  - User login with username and password

- Authorization:

  - One cannot manage posts and view user profile without being authenticated

  - One cannot edit or delete posts and comments created by other users

- Manage travel place posts with basic functionalities:

  - Create, edit and delete posts and comments

  - Upload travel place photos

- Manage user account with basic functionalities:

  - Profile page setup with sign-up

- Flash messages responding to users' interaction with the app

- Responsive web design

### Custom Enhancements

- Update travel place photos when editing

- Update personal information on profile page

## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone or download this repository

```sh
git clone https://github.com/msonmezates/Travel_Club.git
```

### Change directory

```sh
Navigate into directory `cd Travel_Club`
```

### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

### Run

```sh
node app.js

> Server runs on http://localhost:3000
```


## Built with

### Front-end

- [ejs](http://ejs.co/)
- [Bootstrap](https://getbootstrap.com/)

### Back-end

- [express](https://expressjs.com/)
- [mongoDB](https://www.mongodb.com/)
- [mongoose](http://mongoosejs.com/)
- [passport](http://www.passportjs.org/)
- [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
- [express-session](https://github.com/expressjs/session#express-session)
- [method-override](https://github.com/expressjs/method-override#method-override)
- [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

## License

#### [MIT](./LICENSE)
