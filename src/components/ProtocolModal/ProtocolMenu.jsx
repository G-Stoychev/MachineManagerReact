import classes from "./ProtocolPlus.module.css";

export default function Menu({
    closeProtocolmodal,
    handleOpenPratnerModal,
    handleSaveNewMove,
    isReturn,
}) {
    return (
        <div className={classes.protocolNav}>
            {!isReturn && (
                <button
                    className="partner-ifno-btn protocol-menu-button"
                    onClick={handleOpenPratnerModal}
                >
                    <i className="fa-solid fa-pen-to-square"></i> Попълни данни
                    за клиент
                </button>
            )}

            <button
                className="protocol-menu-button save-protocol-button"
                onClick={handleSaveNewMove}
            >
                <i className="fa-solid fa-floppy-disk"></i> Запази
            </button>
            <button className={classes.closeBtn} onClick={closeProtocolmodal}>
                Х
            </button>
        </div>
    );
}
