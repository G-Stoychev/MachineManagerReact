import { useEffect, useState } from "react";
import classes from "./aSide.module.css";
import { useInput } from "../../store/InputContext";

export default function ASide({
    listItems,
    title,
    handleAddBtn,
    openFunction,
}) {
    const { aSideIsOpen, openASide } = useInput();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        // Почистване при размонтиране
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <>
            <div className={classes.wrapper}>
                <h2>{title}</h2>
                <div className={classes.btnWrapper}>
                    <button onClick={handleAddBtn}>Добави</button>
                </div>

                <ul>
                    {listItems.map((item, index) => (
                        <li
                            onClick={() => {
                                {
                                    !aSideIsOpen && openASide(),
                                        aSideIsOpen && isMobile && openASide(),
                                        openFunction(
                                            item.title,
                                            item.id,
                                            index
                                        );
                                }
                            }}
                            key={item.title}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
