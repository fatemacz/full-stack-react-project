# Download the zip, unzip and rename the folder

https://github.com/fatemacz/vite-react-eslint-prettier-husky/archive/refs/heads/main.zip

- rename the project in package.json

```json
{
    "name": full-stack-react-project,
    "private": true,
    "version": "0.0.0",
    "type": "module",
    ...
}
```

# Download the backend zip, unzip and rename the folder as "backend" and move it under the project root

https://github.com/fatemacz/express-mongooseodm-jest/archive/refs/heads/main.zip

# Edit backend/package.json to remove "prepare": "husky".

```json
"scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest",
    "lint": "eslint ."
},
```

- Remove the following lint-staged config from the backend/package.json file:

```json
  "lint-staged": {
    ...
    ...
    ...
  }
```

- Remove the backend/.husky, backend/.vscode, and backend/.git folders.

- To make sure all dependencies are installed properly, run the following command in the root of the project folder:

```bash
npm install
```

- Also go to the backend/ directory and install all dependencies there:

```bash
cd backend/
npm install
```

- We can now also remove the husky, lint-staged, and @commitlint packages from the backend project, as we already have it set up in the main project folder:

```bash
npm uninstall husky lint-staged @commitlint/cli @commitlint/config-conventional
```

Tip: It is always a good idea to regularly check which packages you still need and which you can get rid of, to keep your project clean. In this case, we copied code from another project, but do not need the Husky / lint-staged / commitlint setup, as we already have it set up in the root of our project.

- Now go back to the root of the ch4 folder and run the following command to start the frontend server:

```bash
cd ..
npm run dev
```

- Open the frontend in your browser by going to the URL shown by Vite: http://localhost:5173/

- Open src/App.jsx, change the title as follows, and save the file:

```html
<h1>Vite + React + Node.js</h1>
```

You will see that the change is reflected instantly in the browser!

# Creating the user interface for our application

When designing the structure of a frontend, we should also consider the folder structure, so that our app can grow easily in the future. Similar to how we did for the backend, we will also put all our source code into a src/ folder. We can then group the files in separate folders for the different features. Another popular way to structure frontend projects is to group code by routes. Of course, it is also possible to mix them, for example, in Next.js projects we can group our components by features and then create another folder and file structure for the routes, where the components are used. For full-stack projects, it additionally makes sense to first separate our code by creating separate folders for the API integration and UI components.

Now, let’s define the folder structure for our project:

-   - Create a new src/api/ folder.
    - Create a new src/components/ folder.

Tip: It is a good idea to start with a simple structure at first, and only nest more deeply when you actually need it. Do not spend too much time thinking about the file structure when starting a project, because usually, you do not know upfront how files should be grouped, and it may change later anyway.

After defining the high-level folder structure for our projects, let’s now take some time to consider the component structure.

# Component structure

Based on what we defined in the backend, our blog application is going to have the following features:

-   - Viewing a single post
    - Creating a new post
    - Listing posts
    - Filtering posts
    - Sorting posts

The idea of components in React is to have each component deal with a single task or UI element. We should try to make components as fine-grained as possible, in order to be able to reuse code. If we find ourselves copying and pasting code from one component to another, it might be a good idea to create a new component and reuse it in multiple other components.

- Usually, when developing a frontend, we start with a UI mock-up.

- When splitting up the UI into components, we use the "single-responsibility principle", which states that every module should have responsibility over a single encapsulated part of the functionality.

We defined a CreatePost component, with a form to create a new post, a PostFilter component to filter the list of posts, a PostSorting component to sort posts, and a Post component to display a single post.

Look at which components logically belong together, thereby forming a group: we can group the Post components together in PostList, then make an App component to group everything together and define the structure of our app.

# Implementing static React components

Before integrating with the backend, we are going to model the basic features of our application as static React components. Dealing with the static view structure of our application first makes sense, as we can play around and re-structure the application UI if needed, before adding integration to the components, which would make it harder and more tedious to move them around. It is also easier to deal only with the UI first, which helps us to get started quickly with projects and features. Then, we can move on to implementing integrations and handling state.

# The Post component

- First, create a new src/components/Post.jsx file.

    Note: Please note that you should always prefer spacing via CSS, rather than using the <br /> HTML tag. As we are focusing on the UI structure and integration with the backend, so we simply use HTML whenever possible.
    Info: PropTypes are used to validate the props passed to React components and to ensure that we are passing the correct props when using JavaScript. When using a type-safe language, such as TypeScript, we can instead do this by directly typing the props passed to the component.

- Replace the src/App.jsx file with the following contents:

```js
import { Post } from './components/Post.jsx';
export function App() {
    return (
        <Post
            title="Full-Stack React Projects"
            contents="Let's become full-stack developers!"
            author="Aye Chan"
        />
    );
}
```

- Edit src/main.jsx and update the import of the App component because we are now not using export default anymore. Also remove "import './index.css'" line from src/main.jsx and delete index.css and App.css

```js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

# The CreatePost component

- Create a new src/components/CreatePost.jsx file.

```js
export function CreatePost() {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="create-title">Title: </label>
                <input type="text" name="create-title" id="create-title" />
            </div>
            <br />
            <div>
                <label htmlFor="create-author">Author: </label>
                <input type="text" name="create-author" id="create-author" />
            </div>
            <br />
            <textarea />
            <br />
            <br />
            <input type="submit" value="Create" />
        </form>
    );
}
```

- Replace the src/App.jsx file with the following contents:

```js
import { CreatePost } from './components/CreatePost.jsx';
export function App() {
    return <CreatePost />;
}
```

Tip: If you want to test out multiple components at once and keep the tests around for later, or build a style guide for your own component library, you should look into Storybook (https://storybook.js.org), which is a useful tool to build, test, and document UI components in isolation.

# The PostFilter and PostSorting components

- Create a new src/components/PostFilter.jsx file.

```js
import PropTypes from 'prop-types';
export function PostFilter({ field }) {
    return (
        <div>
            <label htmlFor={`filter-${field}`}>{field}: </label>
            <input type="text" name={`filter-${field}`} id={`filter-${field}`} />
        </div>
    );
}
PostFilter.propTypes = {
    field: PropTypes.string.isRequired,
};
```

- Create a new src/components/PostSorting.jsx file.

```js
import PropTypes from 'prop-types';
export function PostSorting({ fields = [] }) {
    return (
        <div>
            <label htmlFor="sortBy">Sort By: </label>
            <select name="sortBy" id="sortBy">
                {fields.map((field) => (
                    <option key={field} value={field}>
                        {field}
                    </option>
                ))}
            </select>
            {' / '}
            <label htmlFor="sortOrder">Sort Order: </label>
            <select name="sortOrder" id="sortOrder">
                <option value={'ascending'}>ascending</option>
                <option value={'descending'}>descending</option>
            </select>
        </div>
    );
}
PostSorting.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};
```

# The PostList component

After implementing the other post-related components, we can now implement the most important part of our blog app, that is, the feed of blog posts. For now, the feed is simply going to show a list of blog posts.

- Create a new src/components/PostList.jsx file.

```js
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Post } from './Post.jsx';

export function PostList({ posts = [] }) {
    return (
        <div>
            {posts.map((post) => (
                <Fragment key={post._id}>
                    <Post {...post} />
                    <hr />
                </Fragment>
            ))}
        </div>
    );
}

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
};
```

We return the <Post> component for each post, and pass all the keys from the post object to the component as props. We do this by using the spread syntax, which has the same effect as listing all the keys from the object manually as props, like so:

```html
<Post title="{post.title}" author="{post.author}" contents="{post.contents}" />
```

Note: If we are rendering a list of elements, we have to give each element a unique key prop. React uses this key prop to efficiently compute the difference between two lists when the data has changed.

- Edit the src/App.jsx file

```js
import { PostList } from './components/PostList.jsx';
const posts = [
    {
        title: 'Full-Stack React Projects',
        contents: "Let's become full-stack developers!",
        author: 'Aye Chan',
    },
    { title: 'Hello React!' },
    { title: 'You are almost there!' },
];
export function App() {
    return <PostList posts={posts} />;
}
```

# Putting the app together

- Update src/App.jsx and add imports for the CreatePost, PostFilter, and PostSorting components:

```js
import { PostList } from './components/PostList.jsx';
import { CreatePost } from './components/CreatePost.jsx';
import { PostFilter } from './components/PostFilter.jsx';
import { PostSorting } from './components/PostSorting.jsx';
const posts = [
    {
        title: 'Full-Stack React Projects',
        contents: "Let's become full-stack developers!",
        author: 'Aye Chan',
    },
    { title: 'Hello React!' },
    { title: 'You are almost there!' },
];
export function App() {
    return (
        <div style={{ padding: 8 }}>
            <CreatePost />
            <br />
            <hr />
            Filter by:
            <PostFilter field="author" />
            <br />
            <PostSorting fields={['createdAt', 'updatedAt']} />
            <hr />
            <PostList posts={posts} />
        </div>
    );
}
```

# Integrating the backend service using TanStack Query

After finishing creating all the UI components, we can now move on to integrating them with the backend we created in https://github.com/fatemacz/express-mongooseodm-jest . For the integration, we are going to use TanStack Query (previously called React Query), which is a data fetching library that can also help us with caching, synchronizing, and updating data from a backend.

TanStack Query specifically focuses on managing the state of fetched data "server state". While other state management libraries can also deal with server state, they specialize in managing "client state" instead.

Server state has some stark differences from client state, such as the following:

- Being persisted remotely in a location the client does not control directly
- Requiring asynchronous APIs to fetch and update state
- Having to deal with "shared ownership", which means that other people can change the state without your knowledge
- State becoming stale ("out of date") at some point when changed by the server or other people

These challenges with server state result in issues such as having to cache, deduplicate multiple requests, update "out of date" state in the background, and so on.

TanStack Query provides solutions to these issues out of the box and thus makes dealing with server state simple. You can always combine it with other state management libraries that focus on client state as well. For use cases where the client state essentially just reflects the server state though, TanStack Query on its own can be good enough as a state management solution!

Note: The reason why React Query got renamed to TanStack Query is that the library now also supports other frameworks, such as Solid, Vue, and Svelte!

# Setting up TanStack Query for React

- Install the @tanstack/react-query dependency by running the following command in the root of our project (Open a new Terminal and do not quit Vite!):

```bash
npm install @tanstack/react-query
```

- Rename the src/App.jsx file to src/Blog.jsx. Do not update imports yet. If VS Code asks you to update imports, click No.

- Create a new src/App.jsx file. In this file, import QueryClient and QueryClientProvider from TanStack React Query:

```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Blog } from './Blog.jsx';
const queryClient = new QueryClient();
export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Blog />
        </QueryClientProvider>
    );
}
```

Vite Output

```
12:07:36 AM [vite] (client) hmr update /src/App.jsx (x2)
12:07:54 AM [vite] (client) ✨ new dependencies optimized: @tanstack/react-query
12:07:54 AM [vite] (client) ✨ optimized dependencies changed. reloading
```

# Fetching blog posts

- First of all, in the second Terminal window opened (not where Vite is running), run the backend server (do not quit Vite!), as follows:

```bash
cd backend
npm start
```

If you get an error, make sure Docker and MongoDB are running properly!
Output

```
> express-mongooseodm-jest@0.0.0 start
> node src/index.js

successfully connected to database: mongodb://localhost:27017/blog
express server running on http://localhost:3001
```

Tip: If you want to develop the backend and frontend at the same time, you can start the backend using npm run dev to make sure it hot reloads when you change the code.

- Create a .env file in the root of the project, and enter the following contents into it:

```
VITE_BACKEND_URL="http://localhost:3001/api/v1"
```

Vite supports dotenv out of the box. All environment variables that should be available to be accessed within the frontend need to be prefixed with VITE\_. Here, we set an environment variable to point to our backend server.

- Create a new src/api/posts.js file. In this file, we are going to define a function to fetch posts, which accepts the query params for the /posts endpoint as an argument. These query params are used to filter by author and tag and define sorting using sortBy and sortOrder:

```js
export const getPosts = async (queryParams) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts?` + new URLSearchParams(queryParams)
    );
    return await res.json();
};
```

- Edit src/Blog.jsx and remove the sample posts array:

```js
import { useQuery } from '@tanstack/react-query';
import { PostList } from './components/PostList.jsx';
import { CreatePost } from './components/CreatePost.jsx';
import { PostFilter } from './components/PostFilter.jsx';
import { PostSorting } from './components/PostSorting.jsx';
import { getPosts } from './api/posts.js';

export function Blog() {
    const postsQuery = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
    });

    const posts = postsQuery.data ?? [];

    return (
        <div style={{ padding: 8 }}>
            <CreatePost />
            <br />
            <hr />
            Filter by:
            <PostFilter field="author" />
            <br />
            <PostSorting fields={['createdAt', 'updatedAt']} />
            <hr />
            <PostList posts={posts} />
        </div>
    );
}
```

# Implementing filters and sorting

- Edit the src/Blog.jsx file and importing the useState hook from React:

```js
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostList } from './components/PostList.jsx';
import { CreatePost } from './components/CreatePost.jsx';
import { PostFilter } from './components/PostFilter.jsx';
import { PostSorting } from './components/PostSorting.jsx';
import { getPosts } from './api/posts.js';

export function Blog() {
    const [author, setAuthor] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('descending');

    const postsQuery = useQuery({
        queryKey: ['posts', { author, sortBy, sortOrder }],
        queryFn: () => getPosts({ author, sortBy, sortOrder }),
    });

    const posts = postsQuery.data ?? [];

    return (
        <div style={{ padding: 8 }}>
            <CreatePost />
            <br />
            <hr />
            Filter by:
            <PostFilter field="author" value={author} onChange={(value) => setAuthor(value)} />
            <br />
            <PostSorting
                fields={['createdAt', 'updatedAt']}
                value={sortBy}
                onChange={(value) => setSortBy(value)}
                orderValue={sortOrder}
                onOrderChange={(orderValue) => setSortOrder(orderValue)}
            />
            <hr />
            <PostList posts={posts} />
        </div>
    );
}
```

Note: For simplicity’s sake, we are only using state hooks for now. A state management solution or context could make dealing with filters and sorting much easier, especially for larger applications. For our small blog application, it is fine to use state hooks though, as we are focusing mostly on the integration of the backend and frontend.

- Edit src/components/PostFilter.jsx and add the value and onChange props:

```js
import PropTypes from 'prop-types';
export function PostFilter({ field, value, onChange }) {
    return (
        <div>
            <label htmlFor={`filter-${field}`}>{field}: </label>
            <input
                type="text"
                name={`filter-${field}`}
                id={`filter-${field}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
PostFilter.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
```

- Edit src/components/PostSorting.jsx and add the value and onChange props:

```js
import PropTypes from 'prop-types';

export function PostSorting({ fields = [], value, onChange, orderValue, onOrderChange }) {
    return (
        <div>
            <label htmlFor="sortBy">Sort By: </label>
            <select
                name="sortBy"
                id="sortBy"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {fields.map((field) => (
                    <option key={field} value={field}>
                        {field}
                    </option>
                ))}
            </select>
            {' / '}
            <label htmlFor="sortOrder">Sort Order: </label>
            <select
                name="sortOrder"
                id="sortOrder"
                value={orderValue}
                onChange={(e) => onOrderChange(e.target.value)}
            >
                <option value={'ascending'}>ascending</option>
                <option value={'descending'}>descending</option>
            </select>
        </div>
    );
}

PostSorting.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    orderValue: PropTypes.string.isRequired,
    onOrderChange: PropTypes.func.isRequired,
};
```

In your browser, enter the name of the author. You should see TanStack Query re-fetch the posts from the backend as you type, and once a match is found, the backend will return all posts by that author!

After testing it out, make sure to clear the filter again, so that newly created posts are not filtered by the author anymore later on.

Tip: If you do not want to make that many requests to the backend, make sure to use a debouncing state hook, such as useDebounce, and then pass only the debounced value to the query param. If you are interested in gaining further knowledge about the useDebounce hook and other useful hooks, I recommend checking out my book titled Learn React Hooks.

# Creating new posts

To do this, we need to use the useMutation hook from TanStack Query. While queries are meant to be idempotent (meaning that calling them multiple times should not affect the result), mutations are used to create/update/delete data or perform
operations on the server. Let’s get started using mutations to create new posts now:

- Edit src/api/posts.js and define a new createPost function, which accepts a post object as an argument:

```js
export const getPosts = async (queryParams) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts?` + new URLSearchParams(queryParams)
    );
    return await res.json();
};

export const createPost = async (post) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    });
    return await res.json();
};
```

After defining the createPost API function, let’s use it in the CreatePost component by creating a new mutation hook there.

- Edit src/components/CreatePost.jsx and import the useMutation hook from @tanstack/react-query, the useState hook from React, and our createPost API function:

```js
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createPost } from '../api/posts.js';

export function CreatePost() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [contents, setContents] = useState('');

    const createPostMutation = useMutation({
        mutationFn: () => createPost({ title, author, contents }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createPostMutation.mutate();
    };

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
            <div>
                <label htmlFor="create-author">Author: </label>
                <input
                    type="text"
                    name="create-author"
                    id="create-author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
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
```

Now we can try adding a new post, and it seems to work fine, but the post list is not updating automatically, only after a refresh! The issue is that the query key did not change, so TanStack Query does not refresh the list of posts. However, we also want to refresh the list when a new post is created.

# Invalidating queries

To ensure that the post list is refreshed after creating a new post, we need to invalidate the query. We can make use of the query client to do this.

- Edit src/components/CreatePost.jsx and import the useQueryClient hook:

```js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPost } from '../api/posts.js';

export function CreatePost() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [contents, setContents] = useState('');

    const queryClient = useQueryClient();
    const createPostMutation = useMutation({
        mutationFn: () => createPost({ title, author, contents }),
        onSuccess: () => queryClient.invalidateQueries(['posts']),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createPostMutation.mutate();
    };

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
            <div>
                <label htmlFor="create-author">Author: </label>
                <input
                    type="text"
                    name="create-author"
                    id="create-author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
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
```

Try creating a new post, and you will see that it works now, even with active filters and sorting!
As we can see, TanStack Query is great for handling server state with ease.

# Deploying the Application with Docker and CI/CD

Now that we have successfully developed our first full-stack application with a backend service and a frontend, we are going to package our app into Docker images and learn how to deploy them using continuous integration (CI) and continuous delivery (CD) principles.

# Creating the backend Dockerfile

Create a new backend/Dockerfile file inside the project folder.

- Define a base image for our image, which will be version 20 of the node image provided by Docker Hub.
- The WORKDIR instruction is similar to using cd in the terminal.
- Copy the package.json and package-lock.json files from our project to the working directory
    - The package-lock.json file is needed to ensure that the Docker image contains the same versions of the npm packages as our local build.
- RUN npm install to install all dependencies in the image
- Copy the rest of our application from the local file system to the Docker image:
- Finally, we run our application: CMD ["npm", "start"]

Note: Are you wondering why we initially just copied package.json and package-lock.json? Docker images are built layer by layer. Each instruction forms a layer of the image. If something changes, only the layers following the change are rebuilt. So, in our case, if any of the code changes, only this last COPY instruction is re-executed when rebuilding the Docker image. Only if dependencies change are the other COPY instruction and npm install re-executed. Using this order of instruction reduces the time required to rebuild the image immensely.

```dockerfile
FROM node:20
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install
COPY . .

CMD ["npm", "start"]
```

- Create a .dockerignore file

The COPY command, where we copy all files, would also copy the node_modules folder and other files, such as the .env file, which we do not want to go into our image. To prevent certain files from being copied into our Docker image, we need to create a .dockerignore file.

```
node_modules
.env*
```

# Building the Docker image

```bash
docker image build -t blog-backend backend/
```

We specified blog-backend as the name of our image and backend/ as the working directory.

After running the command, Docker will start by reading the Dockerfile and .dockerignore file.
Then, it will download the node image and run our instructions one by one. Finally, it will export all layers and metadata into our Docker image.

# Creating and running a container from our image

- List all available images:

```bash
docker images
```

- Run the backend container as follows (Make sure the dbserver container with our database is already running.):
    - --name specifies a custom name for the container. You have to remove (or rename) the existing container to be able to reuse that name.
    - -it runs the container in interactive mode (-t to allocate a pseudo Terminal and -i to keep the input stream open).
    - -e PORT=3001 sets the PORT environment variable inside the container to 3001.
    - -e DATABASE_URL=mongodb://host.docker.internal:27017/blog sets the DATABASE_URL environment variable. Here, we replaced localhost with host.docker.internal, as the MongoDB service runs in a different container on the Docker host (our machine).
    - -p 3001:3001 forwards port 3001 from inside the container to port 3001 on the host (our machine).
    - blog-backend is the name of our image.

```bash
docker run --name my-blog-backend -it -e PORT=3001 -e DATABASE_URL=mongodb://host.docker.internal:27017/blog -p 3001:3001 blog-backend
```

Keep the container running for now.

# Creating the frontend Dockerfile

- In the Dockerfile for our frontend, we are going to use two images:

    - A build image to build our project using Vite (which will be discarded, with only the build output kept)
    - A final image, which will serve our static site using nginx

Create a new Dockerfile in the root of our project.

- During build time, we also set the VITE_BACKEND_URL environment variable. In Docker, we can use the ARG instruction to define environment variables that are only relevant when the image is being built.
    - Note: While the ARG instruction defines an environment variable that can be changed at build time using the --build-arg flag, the ENV instruction sets the environment variable to a fixed value, which will persist when a container is run from the resulting image. So, if we want to customize environment variables during build time, we should use the ARG instruction. However, if we want to customize environment variables during runtime, ENV is better suited.
- RUN npm run build - to create a static build of our Vite app
- After the build stage is completed, use the FROM instruction again to create the final stage which base off of the nginx image to run an nginx web server
- Set working directory for final stage to /usr/share/nginx/html, which is the folder that nginx serves static files from.
- Copy everything from the /build/dist folder of the build stage into the final stage

A CMD instruction is not needed in this case, as the nginx image already contains one to run the web server properly.

```dockerfile
FROM node:20 AS build
ARG VITE_BACKEND_URL=http://localhost:3001/api/v1
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx AS final
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist .
```

- Create a .dockerignore file

```
node_modules
.env*
backend
.vscode
.git
.husky
.commitlintrc.json
```

# Building the frontend Docker image

```bash
docker build -t blog-frontend .
```

Docker will now use the node image to build our frontend in the build stage. Then, it will switch to the final stage, use the nginx image, and copy over the built static files from the build stage.

# Creating and running the frontend container

- List all available images:

```bash
docker images
```

- Run the frontend container as follows:
    - The nginx image runs the web server on port 80, so, if we want to use the port 3000 on our host, we need to forward from port 80 to 3000 by passing -p 3000:80.

```bash
docker run --name my-blog-frontend -it -p 3000:80 blog-frontend
```

After running this command and navigating to http://localhost:3000 in your browser, you should see the frontend being served properly and showing blog posts from the backend.

# Managing multiple images using Docker Compose

Docker Compose is a tool that allows us to define and run multi-container applications with Docker. Instead of manually building and running the backend, frontend, and database containers, we can use Compose to build and run them all together.

- Create a new compose.yaml file in the root of our project.
    - start by defining the version of the Docker Compose file specification
    - define a services object, in which we are going to define all the services that we want to use
        - define-database which uses the mongo image and forwards port 27017
        - define blog-backend which uses the Dockerfile defined in the backend/ folder, defines the environment variables for PORT and DATABASE_URL, forwards the port to the host, and depends on blog-database
        - define blog-frontend, which uses the Dockerfile defined in the root, defines the VITE_BACKEND_URL build argument, forwards the port 3000 to the host 80, and depends on blog-backend

```yaml
version: '3.9'
services:
    blog-database:
        image: mongo
        ports:
            - '27017:27017'
    blog-backend:
        build: backend/
        environment:
            - PORT=3001
            - DATABASE_URL=mongodb://host.docker.internal:27017/blog
        ports:
            - '3001:3001'
        depends_on:
            - blog-database
    blog-frontend:
        build:
            context: .
            args:
                VITE_BACKEND_URL: http://localhost:3001/api/v1
        ports:
            - '3000:80'
        depends_on:
            - blog-backend
```

- Stop all running containers:
    - dbserver,
    - blog-backend (name: my-blog-backend),
    - blog-frontend (name: my-blog-frontend)

```bash
docker stop dbserver my-blog-backend my-blog-frontend
```

- Start all services using Docker Compose

```bash
docker compose up
```

Note: Press Ctrl + C to stop all Docker Compose containers.

# Cleaning up unused containers

After experimenting with Docker for a while, there will be lots of images and containers that are not in use anymore. Docker generally does not remove objects unless you explicitly ask it to, causing it to use a lot of disk space. If you want to remove objects, you can either remove them one by one or use one of the prune commands provided by Docker:

- docker container prune: This removes all stopped containers
- docker image prune: This removes all dangling images (images not tagged and not referenced by any container)
- docker image prune -a: This removes all images not used by any containers
- docker volume prune: This removes all volumes not used by any containers
- docker network prune: This cleans up networks not used by any containers
- docker system prune: This prunes everything except volumes
- docker system prune --volumes: This prunes everything

- To remove all unused containers, you should first make sure that all of the containers that you still want to use are running. Then, execute docker container prune in the terminal.

```bash
docker container prune
```

# Deploying our full-stack application to the cloud

- Creating a MongoDB Atlas database
- Creating an account on Azure Devops

- Deploying the backend Docker image to a Docker registry

```bash
cd backend/
docker build --platform linux/amd64 -t blog-backend .
docker tag blog-backend [USERNAME]/blog-backend
docker push [USERNAME]/blog-backend
```

- Deploying the backend Docker image to Azure Container Instances

    - Need to set Environment Variables: PORT , DATABASE_URL

- Deploying the frontend Docker image to a Docker registry

```bash
docker build --platform linux/amd64 --build-arg "VITE_BACKEND_URL=[URL]/api/v1" -t blog-frontend .
docker tag blog-frontend [USERNAME]/blog-frontend
docker push [USERNAME]/blog-frontend
```

- Deploying the frontend Docker image to Azure Container Instances
    - Call IP address (Public) from Container Instance to check the result.

# Configuring CI to automate testing (GitHub)

Continuous Integration (CI) covers the automation of integrating code changes to find bugs quicker and keep the code base easily maintainable. Usually, this is facilitated by having scripts run automatically when a developer makes a pull/merge request before the code is merged into the main branch. This practice allows us to detect problems with our code early by, for example, running the linter and tests before the code can be merged. As a result, CI gives us more confidence in our code and allows us to make and deploy changes faster and more frequently.

- Create a new .github/ folder in the root of our project. Inside it, create a workflows/ folder.

- Adding CI for the frontend
    - Inside the .github/workflows/ folder, create a new file called frontend-ci.yaml.

```yaml
name: Blog Frontend CI
on:
    push:
        branches:
            - main
    pull_request:
        branches:
            - main
jobs:
    lint-and-build:
        runs-on: ubuntu-latest
        strategy:
            matrix:
                node-version: [16.x, 18.x, 20.x]
        steps:
            - uses: actions/checkout@v3
            - name: Use Node.js ${{ matrix.node-version }}
              uses: actions/setup-node@v3
              with:
                  node-version: ${{ matrix.node-version }}
                  cache: 'npm'
            - name: Install dependencies
              run: npm install
            - name: Run linter on frontend
              run: npm run lint
            - name: Build frontend
              run: npm run build
```

- Adding CI for the backend

    - Inside the .github/workflows/ folder, create a new file called backend-ci.yaml.

```yaml
name: Blog Backend CI
on:
    push:
        branches:
            - main
    pull_request:
        branches:
            - main
jobs:
    lint-and-test:
        runs-on: ubuntu-latest
        strategy:
            matrix:
                node-version: [16.x, 18.x, 20.x]
        defaults:
            run:
                working-directory: ./backend
        steps:
            - uses: actions/checkout@v3
            - name: Use Node.js ${{ matrix.node-version }}
              uses: actions/setup-node@v3
              with:
                  node-version: ${{ matrix.node-version }}
                  cache: 'npm'
            - name: Install dependencies
              run: npm install
            - name: Run linter on backend
              run: npm run lint
            - name: Run backend tests
              run: npm test
```

# Configuring CD to automate the deployment

- Getting Docker Hub credentials
- Getting Google Cloud credentials
- Defining the deployment workflow
