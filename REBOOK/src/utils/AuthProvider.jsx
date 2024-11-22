import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (email, password) => {
        const loginResponse = await fetch("/api/v1/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });
        const loginResult = await loginResponse.json();
        console.log(loginResult);
        if (!loginResult.token) {
            console.log("Login failed...");
            return;
        }

        setToken(loginResult.token);
        localStorage.setItem('token', loginResult.token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const validate = async () => {
        const validResponse = await fetch("/api/v1/user/validate", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${token}`
            },
        });

        const validResult = await validResponse.json();
        return validResult;
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, validate }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const useAuth = () => {
    const { token, login, logout, validate } = useContext(AuthContext);


    return { token, login, logout, validate };
};

export { AuthProvider, useAuth };