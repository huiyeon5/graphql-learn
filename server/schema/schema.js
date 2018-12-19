const graphql = require("graphql");
const _ =require('lodash');
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

var books = [
    {name:'hello World', genre:'Fantasy', id:'1','authorId':'1'},
    {name:'hello World2', genre:'Fantasy1', id:'2','authorId':'2'},
    {name:'hello World3', genre:'Fantasy2', id:'3','authorId':'3'},
    {name:'hello World4', genre:'Fantasy', id:'4','authorId':'2'},
    {name:'hello World5', genre:'Fantasy1', id:'5','authorId':'3'},
    {name:'hello World6', genre:'Fantasy2', id:'6','authorId':'3'},
]

var authors = [
    {name:'Huiyeon Kim', age:5, id:'1'},
    {name:'Hyeon Jeong Lee', age:51, id:'2'},
    {name:'Terry Pratchett', age:52, id:'3'},
]


const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id:parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book:{
            type:BookType,
            args: {id:{type:GraphQLID}},
            resolve(parent, args) {
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type:AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, {id:args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});