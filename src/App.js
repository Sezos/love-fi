import { AuthProvider } from "./Context/AuthContext";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
    const options = {
        position: positions.TOP_RIGHT,
        timeout: 1000,
        offset: "10px",
        transition: transitions.FADE,
    };
    return (
        <div>
            <AlertProvider template={AlertTemplate} {...options}>
                <AuthProvider></AuthProvider>
            </AlertProvider>
        </div>
    );
}

export default App;
