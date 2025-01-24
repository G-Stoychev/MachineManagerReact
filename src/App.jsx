import { useState } from "react";
import Container from "./components/Container/Container.jsx";
import LoginPortal from "./components/LoginPortal/LoginPortal.jsx";

function App() {
    const [isValid, setIsvaled] = useState(false);

    function handleCheckLogInfo(name, password) {
        if (name === "Freakx" && password === "123456") {
            setIsvaled(true);
        }
    }
    return (
        <>
            {isValid ? (
                <>
                    <Container />
                </>
            ) : (
                <LoginPortal validLog={handleCheckLogInfo} />
            )}
        </>
    );
}

export default App;
