import { useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';

export function useAuth() {
    const { token, setToken } = useContext(AuthContext);
    return [token, setToken];
}
