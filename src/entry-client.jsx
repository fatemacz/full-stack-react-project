// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { App } from './App.jsx';

// ReactDOM.hydrateRoot(
//     document.getElementById('root'),
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { App } from './App.jsx';
import { routes } from './routes.jsx';

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
    document.getElementById('root'),
    <React.StrictMode>
        <App>
            <RouterProvider router={router} />
        </App>
    </React.StrictMode>
);
