import { useState } from "react";
import Container from "./components/Container/Container.jsx";
import LoginPortal from "./components/LoginPortal/LoginPortal.jsx";

function App() {
    const [isValid, setIsvaled] = useState(true);
    const [userName, setUserName] = useState("");

    function handleCheckLogInfo(name, password) {
        if (name === "Freakx" && password === "123456") {
            setIsvaled(true);
            setUserName("Freakx");
        } else if (name === "Krasi" && password === "654321") {
            setIsvaled(true);
            setUserName("Krasi");
        }
    }

    function handleLogout() {
        setIsvaled(false);
    }
    return (
        <>
            {isValid ? (
                <>
                    <Container userName={userName} logout={handleLogout} />
                </>
            ) : (
                <LoginPortal validLog={handleCheckLogInfo} />
            )}
        </>
    );
}

export default App;
