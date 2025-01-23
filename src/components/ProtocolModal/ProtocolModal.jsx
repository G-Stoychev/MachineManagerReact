export default function ProtocolModal() {
    return (
        <>
            <div className="protocol-nav">
                <button className="partner-ifno-btn protocol-menu-button">
                    <i className="fa-solid fa-pen-to-square"></i> Попълни данни
                    за протокол
                </button>
                <button className="protocol-menu-button save-protocol-button">
                    <i className="fa-solid fa-floppy-disk"></i> Запази
                </button>
                <button className="close-btn  protocol-close-btn protocol-menu-button">
                    Х
                </button>
            </div>
            <div className="wrapper">
                <div className="protocol-container"></div>

                <div className="protocol-container"></div>
            </div>

            <button className="print-button" onclick="window.print()">
                Принтирай протокола
            </button>
        </>
    );
}
