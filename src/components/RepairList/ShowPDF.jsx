import { useState } from "react";
import { getPDFById } from "../../services/dataService";

export default function ShowPDF() {
    const [pdfDataURL, setPdfDataURL] = useState(null);
    const [error, setError] = useState(null);

    const handleLoadPDF = async () => {
        const pdfId = prompt("Въведи ID на PDF файла:");
        if (!pdfId) return;

        const result = await getPDFById(pdfId);
        if (result.success) {
            setPdfDataURL(result.data.pdfData);
            setError(null);
        } else {
            setError(result.error || "Грешка при зареждане");
            setPdfDataURL(null);
        }
    };

    return (
        <div>
            <button onClick={handleLoadPDF}>Зареди PDF от Firebase</button>
            {error && <p style={{ color: "red" }}>{error.toString()}</p>}
            {pdfDataURL && (
                <iframe
                    title="PDF Viewer"
                    src={pdfDataURL}
                    width="100%"
                    height="600px"
                />
            )}
        </div>
    );
}
