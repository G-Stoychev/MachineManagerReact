import { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import {
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

import styles from "./LoginPortal.module.css";

const AuthForm = ({ isUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            isUser(user);
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null); // Update user state after sign-out
            setError(""); // Clear any previous errors
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form className={styles.form} onSubmit={handleSignin}>
                <h2>Login</h2>
                <div className={styles.sectionWrapper}>
                    <label>Name:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div className={styles.sectionWrapper}>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>

                <div className={styles.buttonsWrapper}>
                    <button type="reset" className={styles.resetBtn}>
                        Reset
                    </button>
                    <button type="submit">
                        <i className="fa-solid fa-lock-open"></i>Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
