import { useRef, useState } from "react";

import styles from "./SinginPoratal.module.css";

export default function SinginPortal({ validLog }) {
    const name = useRef();
    const password = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        const enteredName = name.current.value;
        const enteredPassword = password.current.value;

        if (enteredName.trim() === "" || enteredPassword.trim() === "") {
            alert("Enter name and  password");
            return;
        }
        validLog(enteredName, enteredPassword);
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <h2>Login :</h2>
            <div className={styles.sectionWrapper}>
                <label>Name :</label>
                <input type="text" ref={name} />
            </div>
            <div className={styles.sectionWrapper}>
                <label>Password: </label>
                <input type="password" ref={password} />
            </div>

            <div className={styles.buttonsWrapper}>
                <button type="reset" className={styles.resetBtn}>
                    Reset
                </button>
                <button>Login</button>
            </div>
        </form>
    );
}
