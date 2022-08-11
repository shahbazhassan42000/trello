import {togglePasswd} from "./Signup";
import {useState} from "react";
import Loading from "../Loading";

const Login = () => {
    const [msg, setMsg] = useState({show: false, msg: "", type: "error"});
    const [loading, setLoading] = useState(false);
    return (
        <section className="overflow-visible max-w-[400px] mx-auto">
            <form
                onSubmit={(e) => handleLogin(e, setMsg,setLoading)}
                className="flex flex-col space-y-5 text-center bg-[#ffffff] rounded-[3px] py-[25px] px-[40px] shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                <h1 className="-mb-3 text-[#5E6C84]">Log in to continue to:</h1>
                <h1 className="mb-2 text-[#5E6C84] font-bold">Trello</h1>
                <input
                    onFocus={() => setMsg({show: false})}
                    className="text-[14px] bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded-[3px] max-w-[400px] p-[0.5em] focus:bg-[#ffffff] focus:border-[#4C9AFF] focus:shadow-[0_0_0] focus:outline-0"
                    type="text" name="username" placeholder="Username" required/>
                <div className="relative flex items-center">
                    <input
                        onFocus={() => setMsg({show: false})}
                        className="text-[14px] w-full bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded-[3px]  p-[0.5em] focus:bg-[#ffffff] focus:border-[#4C9AFF] focus:shadow-[0_0_0] focus:outline-0"
                        type="password" name="password" minLength="8" placeholder="Password" required/>
                    <span onClick={(e) => togglePasswd(e)}
                          className="text-[#5E6C84] absolute right-2 cursor-pointer fa-solid fa-eye"></span>
                </div>
                {msg.show &&
                    <p className={`text-[14px] ${msg.type === "success" ? "green" : "red"} !mt-0`}>{msg.msg}</p>}
                <button
                    className="bg-[#0052cc] text-[#ffffff] font-bold hover:bg-[#0065ff] py-[0.6em] px-[1.3em] rounded-[0.3em]">
                    Sign in
                </button>
                <a href="/signup" className="text-[#0052cc] text-[14px] hover:underline">Sign up for an account</a>
            </form>
            {loading && <Loading/>}
        </section>
    );
}
export default Login;

const handleLogin = async (e, setMsg,setLoading) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    const {username, password} = formObject;
    console.log(username,password);
    setLoading(true);
    const reqBody = JSON.stringify({user: formObject});
    console.log("Req Body: ", reqBody);
    const url = "http://localhost:8080/api/user/login";
    await fetch(url, {
        method: 'post',
        body: reqBody,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        res.json().then(resBody => {
            setLoading(false);
                if (res.status === 200) {
                    setMsg({show: true, msg: "Log in successfully", type: "success"});
                    form.reset();
                    window.location.pathname = "/";
                    localStorage.setItem("user",JSON.stringify(resBody.user));
                }else if(resBody.error) setMsg({show: true, msg: resBody.error, type: "error"});
                else setMsg({show: true, msg: "An error occurred while log in, please try again", type: "error"});
            }
        ).catch(err => {
            setLoading(false);
            setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
            console.log(err);
        });
    }).catch((err) => {
        console.log("ERROR");
        console.log(err);
    });

}


