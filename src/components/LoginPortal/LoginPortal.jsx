import { useRef } from "react";

import styles from "./LoginPortal.module.css";

export default function LoginPortal({ validLog }) {
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
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className={styles.sectionWrapper}>
                <label>Name:</label>
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
                <button>
                    <i className="fa-solid fa-lock-open"></i>Login
                </button>
            </div>
        </form>
    );
}

export const sendRequest = async (key, newItem) => {
    const existingData = await fetch(
        `https://react-learn-94c74-default-rtdb.europe-west1.firebasedatabase.app/${key}.json`
    );
    const data = await existingData.json();

    const currentArray = data
        ? Array.isArray(data)
            ? data
            : Object.values(data)
        : [];

    currentArray.push(newItem);

    const response = await fetch(
        `https://react-learn-94c74-default-rtdb.europe-west1.firebasedatabase.app/${key}.json`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentArray),
        }
    );

    if (!response.ok) {
        throw new Error("Could not update data!");
    }
};
