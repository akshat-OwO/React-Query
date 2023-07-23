import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, FC, FormEvent, SetStateAction, useRef } from 'react';
import Post from './Post';
import { createPost } from './api/posts';

interface CreatePostProps {
    setCurrentPage: Dispatch<SetStateAction<JSX.Element>>;
}

const CreatePost: FC<CreatePostProps> = ({ setCurrentPage }) => {
    const title = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess(data) {
            void queryClient.setQueryData(["posts", data.id], data);
            void queryClient.invalidateQueries(["posts"], { exact: true });
            setCurrentPage(<Post id={data.id} />);
        },
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (
            typeof title?.current?.value === 'string' &&
            typeof bodyRef?.current?.value === 'string'
        ) {
            createPostMutation.mutate({
                title: title?.current?.value,
                body: bodyRef?.current?.value,
            });
        }
    }
    return (
        <div>
            {createPostMutation.isError &&
                JSON.stringify(createPostMutation.error)}
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" ref={title} />
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <input id="body" type="text" ref={bodyRef} />
                </div>
                <button disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? 'Loading...' : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
