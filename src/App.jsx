import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Blog } from './Blog.jsx';
const queryClient = new QueryClient();
export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <h1>Full Stack React Project - Tutorial</h1>
            <Blog />
        </QueryClientProvider>
    );
}
