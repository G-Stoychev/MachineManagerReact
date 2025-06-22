import { useImperativeHandle, useRef } from "react";

import classes from "./ErrorModal.module.css";

export default function ErrorModal({ title, text, setError, ref }) {
    const errorModal = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                errorModal.current.showModal();
            },
        };
    });

    const handleCloseModal = () => {
        errorModal.current.close();
        setError(false);
    };
    return (
        <dialog ref={errorModal} className={classes.errorModal}>
            <h2>
                ⚠️
                {title}
            </h2>
            <p>{text}</p>
            <div>
                <button onClick={handleCloseModal}> Затвори</button>
            </div>
        </dialog>
    );
}
