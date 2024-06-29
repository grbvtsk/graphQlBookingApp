import { GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,GraphQLID,GraphQLNonNull,GraphQLInputObjectType, GraphQLFloat } from 'graphql';

import  User  from '../user/model.js';
import { UserType } from '../user/type.js';
import {RealestateType} from "../realestate/type.js"
import Realestate from '../realestate/model.js';
const BookingType = new GraphQLObjectType(
    {
        name:"BookingType",
        fields:{
            _id: { type: new GraphQLNonNull(GraphQLID) },
            user:{
                type: GraphQLNonNull(UserType),
                resolve: async (parent) => await User.findOne({_id:parent.user}).lean()
            },
            realestate:{
                type: GraphQLNonNull(RealestateType),
                resolve: async (parent) => await Realestate.findOne({_id:parent.realestate}).lean()
            },
            createdAt: {
                type: GraphQLNonNull(GraphQLString),
                resolve: (parent) => parent.createdAt.toISOString(),
            },
            updatedAt: {
                type: GraphQLNonNull(GraphQLString),
                resolve: (parent) => parent.updatedAt.toISOString(),
            },
            from: {
                type: GraphQLNonNull(GraphQLString),
                resolve: (parent) => parent.from.toISOString(),
            },
            to: {
                type: GraphQLNonNull(GraphQLString),
                resolve: (parent) => parent.to.toISOString(),
            },
        }
    }
)
export {BookingType}