import { useRef, useState } from "react";

import PartnerSection from "./PartnerSection.jsx";
import PartnerModal from "./PartnerModal.jsx";

import { getCompany } from "../../services/dataService.js";

import classes from "./ProtocolModal.module.css";
export default function ProtocolModal({
    machine,
    lastmove,
    closeProtocolmodal,
    onSaveMove,
}) {
    const dialog = useRef();
    const company = getCompany();
    const [partner, setPartner] = useState(lastmove);

    const handleOpenPratnerModal = () => {
        dialog.current.open();
    };

    const handleCreateMove = (newMoveInput) => {
        setPartner(newMoveInput);
    };

    const handleSaveNewMove = () => {
        onSaveMove(partner);
    };
    return (
        <div className={classes.protocolModal}>
            <PartnerModal
                lastmove={partner}
                ref={dialog}
                onCreate={handleCreateMove}
            />
            <div className={classes.protocolNav}>
                <button
                    className="partner-ifno-btn protocol-menu-button"
                    onClick={handleOpenPratnerModal}
                >
                    <i className="fa-solid fa-pen-to-square"></i> Попълни данни
                    за клиент
                </button>
                <button
                    className="protocol-menu-button save-protocol-button"
                    onClick={handleSaveNewMove}
                >
                    <i className="fa-solid fa-floppy-disk"></i> Запази
                </button>
                <button
                    className={classes.closeBtn}
                    onClick={closeProtocolmodal}
                >
                    Х
                </button>
            </div>
            <div className={classes.wrapper}>
                <PartnerSection
                    machine={machine}
                    lastmove={partner}
                    company={company}
                />
                <PartnerSection
                    machine={machine}
                    lastmove={partner}
                    company={company}
                />
            </div>

            <button
                className={classes.printButton}
                onClick={() => window.print()}
            >
                Принтирай протокола
            </button>
        </div>
    );
}
