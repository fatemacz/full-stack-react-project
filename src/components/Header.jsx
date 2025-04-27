import { Link } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../contexts/UseAuth.jsx';
import { User } from './User.jsx';

export function Header() {
    const [token, setToken] = useAuth();

    if (token) {
        const { sub } = jwtDecode(token);
        return (
            <nav>
                Logged in as <User id={sub} />
                <br />
                <button onClick={() => setToken(null)}>Logout</button>
            </nav>
        );
    }

    return (
        <div>
            <Link to="/login">Log In</Link> | <Link to="/signup">Sign Up</Link>
        </div>
    );
}
