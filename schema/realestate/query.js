import { GraphQLList, GraphQLID, GraphQLNonNull } from "graphql";
import {RealestateType} from "./type.js";
import Realestate from './model.js';

export default {
    realestates:{
        type:new GraphQLList(RealestateType),
        resolve:()=>Realestate.find()
    }
}