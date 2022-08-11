import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home";
import Board from "./components/Board/Board";
import Members from "./components/Board/Members";

// require("./utils/auth")
const data = localStorage.getItem('user');
export const user = data ? JSON.parse(data) : data;

function App() {
    console.log(user);
    return (
        <Router>
            <Routes>
                {user && <Route exact path="/" element={<Home/>}/>}
                {user && <Route path="/login" element={<Navigate to="/logout"/>}/>}
                {user && <Route path="/signup" element={<Navigate to="/logout"/>}/>}
                {!user && <Route path="/signup" element={<Auth/>}/>}
                {!user && <Route path="/login" element={<Auth/>}/>}
                {user && <Route path="/b/:boardID" element={<Board/>}/>}
                {user && <Route path={`/b/:boardID/members`} element={<Members/>}/>}
                {user && <Route path="/logout" element={<Auth/>}/>}
                {!user && <Route path="/logout" element={<Navigate to="/login"/>}/>}
                {!user && <Route path="/" element={<Navigate to="/login"/>}/>}
            </Routes>
        </Router>
    );

}

export default App;

