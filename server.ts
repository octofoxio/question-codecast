import { GraphQLServer } from 'graphql-yoga'
import { connect } from 'mongodb'
import gql from 'graphql-tag'
import { createTodo } from './Resolvers';

connect(
  'mongodb://localhost:27018/todo',
  { useNewUrlParser: true }
).then(mongodb => {
  const TodoCollection = mongodb.db('todo').collection('todos')

  class TodoModel {
    public message: string
    constructor(message: string) {
      this.message = message
    }

    async save() {
      await TodoCollection.insertOne({
        message: this.message
      })
    }
  }

  const server = new GraphQLServer({
    context: (ctx) =>{
      return {
        ...ctx,
        TodoModel: TodoModel,
        // สิ่งอื่นๆที่เราจะใส่เข้าไปให้กับ resolver
      }
    },
    resolvers: {
      Mutation: {
        createTodo: createTodo,
      }
    },
    typeDefs: gql`
      type Query {
        hello: String
      }

      type Mutation {
        createTodo(message: String!): String
      }
    `
  })

  server.start(() => console.log('start at http://localhost:4000'))
})
