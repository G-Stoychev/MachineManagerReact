export default function Menu() {
    return (
        <div className="menu-container">
            <div className="main-title">
                <h3 className="company-name-title">
                    Coffee Service Burgas LTD
                </h3>
                <button className="info-button">
                    <i className="fa-solid fa-pen-to-square"></i> info
                </button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Въведи сериен номер"
                />
                <button className="search-button">
                    <i className="fa-solid fa-magnifying-glass"></i>Намери
                </button>
                <button className="reset-search hidden">
                    <i className="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
            <nav>
                <button className="menu-button add-new-button">
                    <i className="fa-solid fa-pen-to-square"></i>Добави
                </button>
                <button className="menu-button add-new-button">
                    <i className="fa-solid fa-pen-to-square"></i>Филтър
                </button>
            </nav>
        </div>
    );
}
