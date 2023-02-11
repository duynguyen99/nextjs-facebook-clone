import { PersistedQueryNotFoundError } from "apollo-server-errors";
import User from "../../models/user"
import Post from "../../models/post"
//TODO: Fix any type
export const Query = {
    users: async (parent: any,args: any,context: any,info: any) => {
        console.log('args', args)
        const users = await User.find();
        console.log('users', users)
        return users;
    },
    user: async (parent: any,args: any,context: any,info: any) => {
        try {
            const user = await User.findOne({_id: args.id});
            return user;
        } catch (error) {
            throw new PersistedQueryNotFoundError()
        }
    },
    posts: async (parent: any,args: any,context: any,info: any) => {
        try {
            const posts = await Post.find();
            return posts;
        } catch (error) {
            throw new PersistedQueryNotFoundError()
        }
    },
    userPosts: async (parent: any,args: any,context: any,info: any) => {
        console.log('userId', args)
        try {
            const userPosts = await Post.find({userId: args.userId});
            return userPosts;
        } catch (error) {
            throw new PersistedQueryNotFoundError()
        }
    },
}