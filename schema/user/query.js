import { GraphQLList, GraphQLID, GraphQLNonNull } from "graphql";
import {UserType} from "./type.js";
import User from './model.js';


export default {
    users:{
        type:new GraphQLList(UserType),
        resolve:()=>User.find()
    }
}
