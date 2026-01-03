require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const app = express();

// Validate required environment variables
if (!process.env.SESSION_SECRET) {
    console.error('ERROR: SESSION_SECRET environment variable is required.');
    console.error('Please set SESSION_SECRET in your .env file or environment.');
    process.exit(1);
}

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"]
        }
    }
}));

// Session configuration
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    name: 'graphy',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'strict',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
};

app.use(session(sessionConfig));

const { URLSearchParams } = require('url');
global.URLSearchParams = URLSearchParams;

// Load US cities data
let rawdata = fs.readFileSync('UScities.json');
let USCities = JSON.parse(rawdata);

// GraphQL schema
let schema = buildSchema(`
    type Query {
        city(name: String): City
        cities(state: String): [City]
    },
    type City {
        city: String
        state: String
    }
`);

let getCity = function(args) { 
    let name = args.name;
    return USCities.filter(city => {
        return city.city == name;
    })[0];
}

let getCities = function(args) {
    if (args.state) {
        let state = args.state;
        return USCities.filter(city => city.state === state);
    } else {
        return USCities;
    }
}

var root = {
    city: getCity,
    cities: getCities
};

// Create an express server and a GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV !== 'production'
}));

app.get('/', (req, res) => {
    res.send("Copy the URL from the address-bar, to paste in Postman to use GraphQL")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On port ${PORT}/graphql`));

