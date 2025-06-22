import { useRef, useState, lazy } from "react";

// import PartnerSection from "./PartnerSection.jsx";
// import PartnerModal from "./PartnerModal.jsx";
// import Menu from "./ProtocolMenu.jsx";

const PartnerSection = lazy(() => import("./PartnerSection.jsx"));
const PartnerModal = lazy(() => import("./PartnerModal.jsx"));
const Menu = lazy(() => import("./ProtocolMenu.jsx"));
import classes from "./ProtocolModal.module.css";

export default function ProtocolModal({
    machine,
    lastmove,
    closeProtocolmodal,
    onSaveMove,
    company,
}) {
    const dialog = useRef();
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
            <Menu
                closeProtocolmodal={closeProtocolmodal}
                handleOpenPratnerModal={handleOpenPratnerModal}
                handleSaveNewMove={handleSaveNewMove}
            />
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
