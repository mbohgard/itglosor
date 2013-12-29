# IT-glosor
IT words encyclopedia in swedish.

## Configuration
This project uses [Grunt](http://gruntjs.com/). Install before proceeding.

### Install dependencies
Install node dependencies in both server/ and client/

    cd client && npm install
    cd server && npm install

### Build and run development server
First build the client:

    cd client && grunt dev

Then run the server:

    cd server && node server.js

Point your browser to http://localhost:8080

### Build to deploy directory
First build the client:

    cd client && grunt deploy

Then run the server with NODE_ENV set to production:

    cd server && NODE_ENV=production node server.js
