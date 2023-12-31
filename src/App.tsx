import { useState } from 'react';
import CreatePost from './CreatePost';
import Post from './Post';
import PostList1 from './PostList1';
import PostList2 from './PostList2';
import PostListPaginated from './PostListPaginated';

const App = () => {
    const [currentPage, setCurrentPage] = useState(<PostList1 />);

    return (
        <div>
            <button onClick={() => setCurrentPage(<PostList1 />)}>
                Posts List 1
            </button>
            <button onClick={() => setCurrentPage(<PostList2 />)}>
                Posts List 2
            </button>
            <button onClick={() => setCurrentPage(<Post id={1} />)}>
                First Post
            </button>
            <button
                onClick={() =>
                    setCurrentPage(
                        <CreatePost setCurrentPage={setCurrentPage} />
                    )
                }
            >
                New Post
            </button>
            <button onClick={() => setCurrentPage(<PostListPaginated />)}>Post List Paginated</button>
            <br />
            {currentPage}
        </div>
    );
};

export default App;
