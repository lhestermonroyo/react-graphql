require('dotenv').config();
const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema');

const app = express();


app
	.use(cors())
	.use('/graphql', graphqlHTTP({
		schema,
		graphiql: true
	}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))