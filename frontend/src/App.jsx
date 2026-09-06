import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import Home from "./Home";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        alert("Logged out successfully!");
    };

    return (
        <div className="app">
            <h1>3W Social App</h1>

            {!token && (
                <>
                    <Login onLogin={() => setToken(localStorage.getItem("token"))} />

                    <hr />

                    <Signup />
                </>
            )}

            {token && (
                <>
                    <button onClick={logout}>Logout</button>

                    <hr />

                    <Profile />

                    <hr />

                    <CreatePost />

                    <hr />

                    <Home />
                </>
            )}
        </div>
    );
}

export default App;