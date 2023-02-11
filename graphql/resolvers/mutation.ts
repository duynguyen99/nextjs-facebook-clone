import { ValidationError } from "apollo-server-express"
import { getSession } from "next-auth/react";
import Post from "../../models/post"

export const Mutation = {
    addPost: async (parent: any, args: any, context: any) => {
        console.log('context', context.req.session)
        if(!args.post){
            throw new ValidationError("post field is required!");
        }
        const session = await getSession({req: context.req.session})
        console.log('session,', session)
        console.log('args', args)
        //TODO: implement get session here
        const post = new Post({
            userId: '637754ff0ae7021cf8590740',
            content: args.post.content
        })
        const savedPost = await post.save();
        console.log('savedPost', savedPost)
        return savedPost;
    }
}