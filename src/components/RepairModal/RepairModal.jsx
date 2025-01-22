export default function RepairModal() {
    return (
        <div>
            <div>
                <h2>Добави ремонт:</h2>
                <div>
                    <button>X</button>
                </div>
                <div>
                    <div>Дана на ремонта:</div>
                    <input type="date" />
                </div>
                <div>
                    <div>Профилактика:</div>
                    <input type="checkbox" />
                </div>
                <div>
                    <div>Ремонтирана oт:</div>
                    <input type="text" placeholder="Въведи име" />
                </div>
            </div>
            <div></div>
            <div>
                <h3>Сменени части и други ремонти:</h3>
                <textarea></textarea>
                <div>
                    <button>Запази</button>
                    <button>Излез</button>
                </div>
            </div>
        </div>
    );
}
