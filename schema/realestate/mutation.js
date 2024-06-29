import {GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLID} from 'graphql';

import {RealestateType} from "./type.js";
import Realestate from './model.js';
import {UserType} from "../user/type.js";
import User from "../user/model.js";


export default {
    realestateCreate:{
        type:RealestateType,
        args:{
            title: { type: GraphQLNonNull(GraphQLString) },
            address: { type: GraphQLNonNull(GraphQLString) },
            price: { type: GraphQLNonNull(GraphQLFloat) },
            owner: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve:async (parent,args)=>{
            try {
            const userRe = await User.findOne({ _id: args.owner })
            if (!userRe){
                const error = new Error('User set as owner does not exist');
                console.log(error);
                throw error;
            }
            const realestate = new Realestate({
                title: args.title,
                address: args.address,
                price: args.price,
                owner: args.owner,
            });
            const newRealestate = await realestate.save();
                userRe.ownedRealestates.push(newRealestate._id);
            await userRe.save();
            return newRealestate;
        } catch (error) {
            console.log(error);
            throw error;
        }}
    }
}