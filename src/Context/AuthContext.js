import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import SignIn from "../Components/Authentication/SignIn";

import { auth } from "../FireBase/Firebase";
import Dashboard from "../Pages/Dashboard";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider() {
    const [currentUser, setCurrentUser] = useState(-1);

    function login(email, password) {
        const sth = signInWithEmailAndPassword(auth, email, password);
        return sth;
    }

    function logout() {
        const sth = signOut(auth);
        return sth;
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        logout,
    };
    return currentUser === -1 ? (
        <></>
    ) : currentUser ? (
        <AuthContext.Provider value={value}>
            <Dashboard />
        </AuthContext.Provider>
    ) : (
        <AuthContext.Provider value={value}>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <SignIn />
                </div>
            </Container>
        </AuthContext.Provider>
    );
}
