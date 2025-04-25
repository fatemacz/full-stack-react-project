// export function CreatePost() {
//     return (
//         <form onSubmit={(e) => e.preventDefault()}>
//             <div>
//                 <label htmlFor="create-title">Title: </label>
//                 <input type="text" name="create-title" id="create-title" />
//             </div>
//             <br />
//             <div>
//                 <label htmlFor="create-author">Author: </label>
//                 <input type="text" name="create-author" id="create-author" />
//             </div>
//             <br />
//             <textarea />
//             <br />
//             <br />
//             <input type="submit" value="Create" />
//         </form>
//     );
// }
// =======================================

// import { useMutation } from '@tanstack/react-query';
// import { useState } from 'react';
// import { createPost } from '../api/posts.js';

// export function CreatePost() {
//     const [title, setTitle] = useState('');
//     const [author, setAuthor] = useState('');
//     const [contents, setContents] = useState('');

//     const createPostMutation = useMutation({
//         mutationFn: () => createPost({ title, author, contents }),
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         createPostMutation.mutate();
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="create-title">Title: </label>
//                 <input
//                     type="text"
//                     name="create-title"
//                     id="create-title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//             </div>
//             <br />
//             <div>
//                 <label htmlFor="create-author">Author: </label>
//                 <input
//                     type="text"
//                     name="create-author"
//                     id="create-author"
//                     value={author}
//                     onChange={(e) => setAuthor(e.target.value)}
//                 />
//             </div>
//             <br />
//             <textarea value={contents} onChange={(e) => setContents(e.target.value)} />
//             <br />
//             <br />
//             <input
//                 type="submit"
//                 value={createPostMutation.isPending ? 'Creating...' : 'Create'}
//                 disabled={!title || createPostMutation.isPending}
//             />
//             {createPostMutation.isSuccess ? (
//                 <>
//                     <br />
//                     Post created successfully!
//                 </>
//             ) : null}
//         </form>
//     );
// }

// =======================================

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPost } from '../api/posts.js';
import { useAuth } from '../contexts/UseAuth.jsx';

export function CreatePost() {
    const [token] = useAuth();

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const queryClient = useQueryClient();
    const createPostMutation = useMutation({
        mutationFn: () => createPost(token, { title, contents }),
        onSuccess: () => queryClient.invalidateQueries(['posts']),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createPostMutation.mutate();
    };

    if (!token) return <div>Please log in to create new posts.</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="create-title">Title: </label>
                <input
                    type="text"
                    name="create-title"
                    id="create-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <br />
            <textarea value={contents} onChange={(e) => setContents(e.target.value)} />
            <br />
            <br />
            <input
                type="submit"
                value={createPostMutation.isPending ? 'Creating...' : 'Create'}
                disabled={!title || createPostMutation.isPending}
            />
            {createPostMutation.isSuccess ? (
                <>
                    <br />
                    Post created successfully!
                </>
            ) : null}
        </form>
    );
}
