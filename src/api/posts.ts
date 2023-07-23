import axios from 'axios';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface CreatePost {
    title: string;
    body: string;
}

export function getPosts() {
    return axios
        .get('http://localhost:3000/posts', { params: { _sort: 'title' } })
        .then((res) => res.data as Post[]);
}

export function getPost(id: number) {
    return axios
        .get(`http://localhost:3000/posts/${id}`)
        .then((response) => response.data as Post);
}

export function createPost({ title, body }: CreatePost) {
    return axios
        .post('http://localhost:3000/posts', {
            title,
            body,
            userId: 1,
            id: Date.now(),
        })
        .then((response) => response.data as Post);
}
