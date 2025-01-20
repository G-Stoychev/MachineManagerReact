import React, { useState } from "react";

const Table = () => {
    const [expandedRow, setExpandedRow] = useState(null);

    const data = [
        {
            id: 1,
            item: "Машина 1",
            repairs: [
                {
                    date: "2025-01-10",
                    description: "Смяна на ремък",
                    parts: "Ремък",
                },
                { date: "2025-01-15", description: "Смазване", parts: "Масло" },
            ],
            clientInfo: { name: "Клиент А", contact: "0891234567" },
        },
        {
            id: 2,
            item: "Машина 2",
            repairs: [
                {
                    date: "2025-01-12",
                    description: "Смяна на филтър",
                    parts: "Филтър",
                },
            ],
            clientInfo: { name: "Клиент Б", contact: "0897654321" },
        },
    ];

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ borderBottom: "2px solid black" }}>
                        <th>Име на машина</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <React.Fragment key={row.id}>
                            <tr style={{ borderBottom: "1px solid gray" }}>
                                <td>{row.item}</td>
                                <td>
                                    <button onClick={() => toggleRow(row.id)}>
                                        {expandedRow === row.id
                                            ? "Скрий"
                                            : "Детайли"}
                                    </button>
                                </td>
                            </tr>
                            {expandedRow === row.id && (
                                <tr>
                                    <td
                                        colSpan="2"
                                        style={{
                                            padding: "10px 20px",
                                            backgroundColor: "#f9f9f9",
                                        }}
                                    >
                                        <h4>Ремонтни дейности:</h4>
                                        <ul>
                                            {row.repairs.map(
                                                (repair, index) => (
                                                    <li key={index}>
                                                        <strong>Дата:</strong>{" "}
                                                        {repair.date},{" "}
                                                        <strong>
                                                            Описание:
                                                        </strong>{" "}
                                                        {repair.description},{" "}
                                                        <strong>Части:</strong>{" "}
                                                        {repair.parts}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <button
                                            onClick={() =>
                                                alert(
                                                    `Клиент: ${row.clientInfo.name}, Контакт: ${row.clientInfo.contact}`
                                                )
                                            }
                                            style={{ marginTop: "10px" }}
                                        >
                                            Информация за клиент
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
