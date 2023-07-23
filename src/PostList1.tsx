import { useQuery } from '@tanstack/react-query';
import { getPosts } from './api/posts';

const PostList1 = () => {
    const { data, status, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        placeholderData: [
            {
                userId: 1,
                id: 1,
                title: 'Placeholder Title',
                body: 'Placeholder Body',
            },
        ]
    });

    if (status === 'loading') <h1>Loading...</h1>;
    if (status === 'error') <h1>{JSON.stringify(error)}</h1>;

    return (
        <div>
            <h1>Post List 1</h1>
            <ol>
                {data?.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ol>
        </div>
    );
};

export default PostList1;
