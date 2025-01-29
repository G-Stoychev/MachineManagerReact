import classes from "./RepairModal.module.css";
import { useActionState } from "react";

export default function RepairModal({
    closeRepairModal,
    repair,
    onCreate,
    onUpdate,
    setError,
}) {
    const isEdit = repair !== undefined;
    const handleSubmit = (prevState, formData) => {
        const repairData = {
            date: formData.get("date"),
            prevention: formData.get("prevention") === "on",
            person: formData.get("person"),
            parts: formData.get("parts"),
        };
        if (repairData.date.trim() === "" || repairData.person.trim() === "") {
            setError(true);
            return;
        }
        if (isEdit) {
            onUpdate({ ...repair, ...repairData });
            return;
        }
        onCreate(repairData);
    };

    const [formState, formAction] = useActionState(handleSubmit, repair);
    return (
        <form action={formAction}>
            <h2>{isEdit ? "Промени" : "Добави"} ремонт:</h2>
            <div className={classes.sectionWrapper}>
                <div>Дата на ремонта:</div>
                <input name="date" type="date" defaultValue={formState?.date} />
            </div>
            <div className={classes.sectionWrapper}>
                <div>Профилактика:</div>
                <input
                    name="prevention"
                    type="checkbox"
                    defaultChecked={formState?.prevention}
                />
            </div>
            <div className={classes.sectionWrapper}>
                <div>Ремонтирана oт:</div>
                <input
                    type="text"
                    name="person"
                    placeholder="Въведи име"
                    defaultValue={formState?.person}
                />
            </div>
            <div className={classes.sectionWrapper}>
                <h3>Сменени части и други ремонти:</h3>
            </div>
            <textarea name="parts" defaultValue={formState?.parts}></textarea>

            <div>
                <button>{isEdit ? "Промени" : "Добави"}</button>

                <button onClick={closeRepairModal}>Излез</button>
            </div>
        </form>
    );
}
