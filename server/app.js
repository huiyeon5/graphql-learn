const express = require("express");
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect("mongodb://huiyeon5:test123@ds121014.mlab.com:21014/graphql-practice");
mongoose.connection.once('open', () => {
    console.log("hello")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log("now listening for requests on port 4000")
})