import { useState, useEffect, useRef } from "react";

import ErrorModal from "../ErrorModal/ErrorModal";

import styles from "./LoginPortal.module.css";

const AuthForm = ({ error, handleSignin, setError }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const errorModal = useRef();

    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSignin(email, password);
    };

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {error && (
                <ErrorModal
                    title="Грешен email или парола"
                    text={error}
                    setError={setError}
                    ref={errorModal}
                />
            )}

            <form className={styles.form} onSubmit={onSubmit}>
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
