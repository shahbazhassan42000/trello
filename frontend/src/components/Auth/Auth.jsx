import leftBg from "../../assets/images/bg-left.svg"
import rightBg from "../../assets/images/bg-right.svg"
import logo from "../../assets/images/trello-board.png"
import Signup from './Signup';
import Login from "./Login";
import Logout from "./Logout";
const Auth = () => {
    const path = window.location.pathname.substring(1).toLowerCase();
    return (
        <>
            <div>
                <img className="h-[43px] my-[40px] mx-auto" src={logo} alt="logo"/>
                {path === "signup" && <Signup/>}
                {path === "login" && <Login/>}
                {path === "logout" && <Logout/>}
            </div>
            <div className="z-[-900] h-full w-full fixed top-0 left-0 overflow-hidden">
                <img className="fixed h-[400px] w-[400px] bottom-0 left-0 z-[-999] max-w-[30%]" src={leftBg}
                     alt="leftBg"/>
                <img className="fixed h-[400px] w-[400px] bottom-0 right-0 z-[-999] max-w-[30%]" src={rightBg}
                     alt="rightBg"/>
            </div>
        </>
    );
}

export default Auth;
