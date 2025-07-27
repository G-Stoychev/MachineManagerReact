import { useEffect, useRef, useState } from "react";

import Filter from "../Menu/Filter";

export default function ContainerMenu({ toggleProtocol }) {
    const searchInput = useRef();
    const inputBulstat = useRef();
    const [searching, setSearching] = useState(false);

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Въведи сериен номер"
                    ref={searchInput}
                />
                <button>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                {searching ? (
                    <button>
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                ) : undefined}
                <input
                    type="text"
                    placeholder="Търси фирма по булстат"
                    ref={inputBulstat}
                />
                <button>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                {searching ? (
                    <button>
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                ) : undefined}
            </div>

            <div onClick={toggleProtocol}>
                <i className="fa-solid fa-pen-to-square"></i> Протокол
            </div>
            <button
                onClick={() => {
                    openModal();
                }}
            >
                <i className="fa-solid fa-pen-to-square"></i>
                Добави
            </button>
            <div>
                {/* <Filter
                    machines={machines}
                    onSelect={onSelect}
                    onReset={onReset}
                /> */}
            </div>
        </>
    );
}
