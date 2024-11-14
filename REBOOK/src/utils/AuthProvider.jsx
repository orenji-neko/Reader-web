import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const useAuth = () => {
    const { token, login, logout } = useContext(AuthContext);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            login(savedToken);
        }
    }, [login]);

    return { token, login, logout };
};

export { AuthProvider, useAuth }