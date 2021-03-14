# FullStack Monorepo Demonstrative Project

Survey App is a simple full-stack app meant for admins to add "candidates", view them, delete them, send an email  to them with a generated link to a survey for self-esteem evaluation and later keep track of their results.
It consists of 3 packages ("app"-frontend, "mailer"-backend and "server"-backend)

*This project serves as an example of implementing multiple full-stack technologies mentioned below, using monorepo with yarn workspaces, "clean-code" modular structure with a React app, Node server and a Mailer server, as well as implementing OAuth 2.0 Google Authentication.*



**.env file is pushed to repo only for easy and quick testing purposes, and should never be involved in production**
**database_init.sql also serves for quick-testing purposes, where scripts for creating all the needed tables, initial inserts and constraints are**


## Server

### Using
* ES6 Javascript
* Node.js
* Express.js & Express Router (dynamic routes and parameter evaluation included)
* Authentication with Google OAuth 2.0
* Crypto - for generating custom user  URL & PIN
* Mysql
* Development dependencies
  * Babel
  * Nodemon
  * Dotenv
  * Pino-Pretty

### REST API Routes
* /login -- OAuth 2.0 authentication & additional check if user is in "admins" table
* **/candidate/all** -- GET a list of all candidates
* **/candidate/:id** -- GET a candidate with the given id
* **/candidate** --     POST a new candidate to database
* **/candidate/:id/** -- DELETE a candidate with the given id
* **/candidate/survey** -- POST a candidate survey (generates url & PIN)
* **/candidate/surveyUser** -- POST - check if URL of a survey belongs to a user, return user info if does
* /candidate/survey/:id -- PUT - insert candidate results into his database survey record

The **bolded endpoints** are authenticated calls

## Mailer
### Using
* ES6 Javascript
* Node.js
* Express.js
* Mysql
* Mustache
* Nodemailer
* Development dependencies
  * Babel
  * Nodemon
  * Dotenv
  * Pino-Pretty


### REST API Routes
* /sendmail -- POST - request body consists of mail data (subject,to,cc,bcc,data and template). 
  * "Data" reperesents an object of dynamic e-mail parameters  - candFirstName, candLastName, quUrl, quPIN (custom URL and PIN to a survey of a recipient - candidate). These parameters are bound to the template "candidateEmail.html" using *Mustache* library
  * "From" is defined in ".env" variable so there is no need to send it in the request body
  * "Template" - name of an email template which we want to send (currently only candidateEmail.html available)
  * CC,BCC - can be either a string or an array of strings 


## Frontend
### Using
* React
* React-Redux (Thunk middleware, Devtools extension) - state management
* Styled-System, Styled-Components 
* Antd - design templates


