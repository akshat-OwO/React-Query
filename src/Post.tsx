import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { getPost } from './api/posts';
import { getUser } from './api/users';

interface PostProps {
    id: number;
}

const Post: FC<PostProps> = ({ id }) => {
    const postQuery = useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPost(id),
    });

    const userQuery = useQuery({
        queryKey: ['users', postQuery?.data?.userId],
        enabled: postQuery?.data?.userId !== null,
        queryFn: () => {
            if (typeof postQuery?.data?.userId === 'undefined') return;
            return getUser(postQuery?.data?.userId);
        },
    });

    if (postQuery.status === 'loading') <h1>Loading...</h1>;
    if (postQuery.status === 'error')
        <h1>{JSON.stringify(postQuery.error)}</h1>;

    return (
        <div>
            <h1>
                {postQuery.data?.title} <br />
                <small>
                    {userQuery.isLoading
                        ? 'Loading User...'
                        : userQuery.isError
                        ? 'Error Loading User...'
                        : userQuery.data?.name}
                </small>
            </h1>
            {postQuery.data?.body}
        </div>
    );
};

export default Post;
