import React from 'react';
import { Post } from '../types/Base';
import Card from './Card';

const Post = ({content}: Post) => {
    return (
        <Card className='mt-4'>
            {content}
        </Card>
    );
};

export default Post;