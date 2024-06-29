import { GraphQLString, GraphQLNonNull } from 'graphql';
import bcrypt from 'bcryptjs';
import User from './model.js';
import {UserType} from './type.js';

export default {
    userCreate:{
        type:UserType,
        args:{
            email:{ type: GraphQLNonNull(GraphQLString) },
            password:{type: GraphQLNonNull(GraphQLString)},
        },
        resolve:async (parent,args)=>{
            try {
                const existingUser = await User.findOne({ email: args.email }).lean()
                if (existingUser) {
                    const error = new Error('Email already exists');
                    console.log(error);
                    throw error;
                }
                const hashedPassword = await bcrypt.hash(args.password, 10);
                const user = new User({
                    email: args.email,
                    password: hashedPassword,
                });
                const newUser = await user.save();
                delete newUser.password;
                newUser.password = null;
                return newUser;
            }catch (error) {
                console.log(error);
                throw error;
            }
        }
    }
}

