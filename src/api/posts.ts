import axios, { AxiosHeaderValue, AxiosHeaders, AxiosResponseHeaders } from 'axios';

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

export function getPostPaginated(page: number) {
    return axios.get('http://localhost:3000/posts', {
        params: { _page: page, _sort: "title", _limit: 2 }
    }).then(response => {
        const hasNext = page * 2 <= parseInt(response.headers["x-total-count"] as string)
        return {
            nextPage: hasNext ? page + 1: undefined,
            previousPage: page > 1 ? page - 1: undefined,
            posts: response.data as [CreatePost]
        }
    })
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
