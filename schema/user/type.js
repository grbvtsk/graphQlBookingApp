import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLInputObjectType,
} from "graphql";
import {RealestateType} from "../realestate/type.js"

import Realestate from '../realestate/model.js';

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLID) },
        email: { type: GraphQLNonNull(GraphQLString) },
        // PASSWORD IS NULLABLE - USER OBJECT WE SEND CAN BE NULL
        // WE ONLY NEED IT FOR SIGNUP AND LOGIN
        password: { type: GraphQLString },
        ownedRealestates: {
            type: GraphQLList(GraphQLNonNull(RealestateType)),
            resolve: async (parent) =>
                await Realestate.find({ owner: parent._id }).lean(),
        },
    }),
});

export {UserType}