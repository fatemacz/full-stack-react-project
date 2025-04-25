// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Blog } from './pages/Blog.jsx';
// import { Signup } from './pages/Signup.jsx';
// import { Login } from './pages/Login.jsx';
// import { AuthContextProvider } from './contexts/AuthContextProvider.jsx';

// const queryClient = new QueryClient();

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Blog />,
//     },
//     {
//         path: '/signup',
//         element: <Signup />,
//     },
//     {
//         path: '/login',
//         element: <Login />,
//     },
// ]);

// export function App() {
//     return (
//         <QueryClientProvider client={queryClient}>
//             <AuthContextProvider>
//                 <RouterProvider router={router} />
//             </AuthContextProvider>
//         </QueryClientProvider>
//     );
// }

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './contexts/AuthContextProvider.jsx';
import PropTypes from 'prop-types';

const queryClient = new QueryClient();

export function App({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>{children}</AuthContextProvider>
        </QueryClientProvider>
    );
}

App.propTypes = {
    children: PropTypes.element.isRequired,
};
