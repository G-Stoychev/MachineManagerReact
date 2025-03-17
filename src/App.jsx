import { useState } from "react";
import Container from "./components/Container/Container.jsx";
import AuthForm from "./components/LoginPortal/AuthForm.jsx";

function App() {
    const [isValid, setIsValid] = useState(false);
    const [userName, setUserName] = useState("guest");

    function CheckLogUser(user) {
        if (user) {
            setIsValid(true);
        }
        console.log(user);
    }

    function handleLogout() {
        setIsValid(false);
    }

    return (
        <>
            {isValid ? (
                <>
                    <Container userName={userName} logout={handleLogout} />
                </>
            ) : (
                <AuthForm isUser={CheckLogUser} />
            )}
        </>
    );
}

export default App;

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
