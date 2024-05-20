import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
// firebase
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // 2. login
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    // 3. sign in with google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    // 4. reset password
    const resetPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }
    // 5. log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    // 6 update profile info
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // observe auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if(currentUser) {
                axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`, {
                    email: currentUser.email
                })
                .then(data => {
                    localStorage.setItem('access-token', data.data.token);
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }

            console.log('current user', currentUser);
        })
        return () => {
            return unsubscribe()
        }
    }, [])


    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;