import { GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,GraphQLID,GraphQLNonNull,GraphQLInputObjectType, GraphQLFloat } from 'graphql';

import {BookingType} from "./type.js";
import Booking from "./model.js";


const bookingCreate = {
    type: BookingType,
    args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        realestateId: { type: GraphQLNonNull(GraphQLID) },
        from: { type: GraphQLString },
        to: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        const booking = new Booking({
            user: args.userId,
            realestate: args.realestateId,
            from: args.from,
            to: args.to,
        });
        return await booking.save();},
    };

const bookingDelete = {
    type: BookingType,
    args: { bookingId: { type: GraphQLNonNull(GraphQLID) } },
    resolve: async (parent, args) => {
        const deletedBooking = await Booking.findById(args.bookingId);
        await Booking.deleteOne({ _id: args.bookingId });
        return deletedBooking;
    },
};


export default {bookingCreate,bookingDelete}