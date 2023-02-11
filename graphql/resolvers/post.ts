import User from "../../models/user";


export const Post = {
    author: async (parent: any) => {
        console.log('parent', parent)
        const author = await User.findOne({_id: parent.userId});
        return author;
    }
}
