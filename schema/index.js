import { GraphQLSchema, GraphQLObjectType } from "graphql";

import {User, userMutation} from "./user/index.js";
import {Realestate,RealestateMutation} from "./realestate/index.js";
import {Booking,bookingCreate,bookingDelete} from "./booking/index.js"


export default new GraphQLSchema({
    query:new GraphQLObjectType({
        name:"Query",
        fields:{
            ...User,
            ...Realestate,
            ...Booking
        },
    }),
    mutation: new GraphQLObjectType({
        name:"Mutation",
        fields:{
            ...userMutation,
            ...RealestateMutation,
            ...bookingCreate,
            ...bookingDelete
        }
    })
})