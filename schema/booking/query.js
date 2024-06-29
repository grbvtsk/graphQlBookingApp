import { GraphQLList, GraphQLID, GraphQLNonNull } from "graphql";
import {BookingType} from "./type.js";
import Booking from './model.js';

export default {
    bookings:{
        type:new GraphQLList(BookingType),
        resolve:()=>Booking.find()
    }
}