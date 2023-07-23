import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPostPaginated } from './api/posts';

const PostListPaginated = () => {
    const [page, setPage] = useState<number | undefined>(1);

    const { status, error, data, isPreviousData } = useQuery({
        queryKey: ['posts', { page }],
        keepPreviousData: true,
        queryFn: () => {
            if (typeof page === 'number') return getPostPaginated(page);
        },
    });

    if (status === 'loading') return <h1>Loading...</h1>;
    if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div>
            <h1>
                Post List Paginated
                <br />
                <small>{isPreviousData && 'Previous Data'}</small>
            </h1>
            {data?.posts.map((post) => (
                <div key={post.title}>{post.title}</div>
            ))}
            {data?.previousPage && (
                <button onClick={() => setPage(data.previousPage)}>
                    Previous
                </button>
            )}
            {data?.nextPage && (
                <button onClick={() => setPage(data.nextPage)}>Next</button>
            )}
        </div>
    );
};

export default PostListPaginated;
