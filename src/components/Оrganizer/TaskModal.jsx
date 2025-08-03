import {
    useRef,
    useImperativeHandle,
    useState,
    useEffect,
    lazy,
    useActionState,
} from "react";

const ErrorModal = lazy(() => import("../ErrorModal/ErrorModal.jsx"));

import classes from "./TaskModal.module.css";

export default function TaskModal({
    ref,
    handleAddNewTask,
    selectectTask,
    handleOnUpdate,
}) {
    const taskDialog = useRef();

    const [error, setError] = useState(false);
    const errorModal = useRef();
    useEffect(() => {
        if (error && errorModal.current) {
            errorModal.current.open();
        }
    }, [error]);

    useImperativeHandle(ref, () => {
        return {
            open() {
                taskDialog.current.showModal();
            },
        };
    });

    const isEdit = selectectTask !== undefined;

    const handleCloseTaskDialog = () => taskDialog.current.close();

    const handleSubmit = (prevState, formData) => {
        const deadlineInput = formData.get("deadline");
        const deadlineDate = new Date(deadlineInput);
        const task = {
            title: formData.get("title"),
            status: "inProgress",
            deadline: deadlineDate.toLocaleDateString("bg-BG"),
            createDate: new Date().toLocaleDateString("bg-BG"),
            description: formData.get("description"),
        };
        if (Object.values(task).some((value) => value.trim() === "")) {
            setError(true);
            return;
        }
        if (isEdit) {
            handleOnUpdate({ ...selectectTask, ...task });
            handleCloseTaskDialog();
            return;
        }
        handleAddNewTask(task);
        handleCloseTaskDialog();
    };

    const [formState, formAction] = useActionState(handleSubmit, selectectTask);

    return (
        <>
            {error && (
                <ErrorModal
                    title="Не попълнени полета!"
                    text={"Моля попълнете всичките полета!"}
                    setError={setError}
                    ref={errorModal}
                />
            )}
            <dialog ref={taskDialog} className={classes.dialog}>
                <form action={formAction}>
                    <div className={classes.dialogMenu}>
                        <h2>{isEdit ? "Промени" : "Добави"} задача:</h2>
                        <button type="button" onClick={handleCloseTaskDialog}>
                            X
                        </button>
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label> Заглавие на задача:</label>
                        <input
                            type="text"
                            name="title"
                            defaultChecked={formState?.title}
                        />
                    </div>

                    <div className={classes.sectionWrapper}>
                        <label> Крайна дата за изпълнение:</label>
                        <input
                            type="date"
                            name="deadline"
                            defaultChecked={formState?.deadline}
                        />
                    </div>
                    <div className={classes.sectionWrapper}>
                        <label>Описание:</label>
                        <input
                            type="text"
                            placeholder="Въведи модел"
                            name="description"
                            defaultChecked={formState?.description}
                        />
                    </div>
                    <div className={classes.btnSection}>
                        <button>Добави</button>
                    </div>
                </form>
            </dialog>
        </>
    );
}
