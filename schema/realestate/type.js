import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInputObjectType, GraphQLFloat,
} from "graphql";
import  User  from '../user/model.js';
import { UserType } from '../user/type.js';

const RealestateType = new GraphQLObjectType({
    name: 'RealestateType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLFloat) },
        owner: {
            type: GraphQLNonNull(UserType),
            resolve: async (parent) => await User.findOne({_id:parent.owner}).lean(),
        },
    }),
});

export {RealestateType}