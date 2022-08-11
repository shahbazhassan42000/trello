import {useState} from "react";
import Loading from "../Loading";

const Signup = () => {
    const [msg, setMsg] = useState({show: false, msg: "", type: "general"});
    const [loading, setLoading] = useState(false);
    return (
        <section className="overflow-visible max-w-[400px] mx-auto">
            <form
                onFocus={() => setMsg({show: false})}
                onSubmit={(e) => handleSignup(e, setMsg,setLoading)}
                className="flex flex-col space-y-5 text-center bg-[#ffffff] rounded-[3px] py-[25px] px-[40px] shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                <h1 className="mb-2 text-[#5E6C84] font-bold">Sign up for your account</h1>
                <input
                    className="text-[14px] bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded-[3px] max-w-[400px] p-[0.5em] focus:bg-[#ffffff] focus:border-[#4C9AFF] focus:shadow-[0_0_0] focus:outline-0"
                    type="text" name="username" placeholder="Username" required/>
                {msg.show && msg.type === "username" && <p className="text-[14px] text-[#EB5A46] !mt-0">{msg.msg}</p>}
                <input
                    onFocus={() => setMsg({show: false})}
                    className="text-[14px] bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded-[3px] max-w-[400px] p-[0.5em] focus:bg-[#ffffff] focus:border-[#4C9AFF] focus:shadow-[0_0_0] focus:outline-0"
                    type="email" name="email" placeholder="Enter email" required/>
                {msg.show && msg.type === "email" && <p className="text-[14px] text-[#EB5A46] !mt-0">{msg.msg}</p>}
                <div className="relative flex items-center">
                    <input
                        onFocus={() => setMsg({show: false})}
                        className="text-[14px] w-full bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded-[3px]  p-[0.5em] focus:bg-[#ffffff] focus:border-[#4C9AFF] focus:shadow-[0_0_0] focus:outline-0"
                        type="password" name="password" minLength="8" placeholder="Password" required/>
                    <span onClick={(e) => togglePasswd(e)}
                          className="text-[#5E6C84] absolute right-2 cursor-pointer fa-solid fa-eye"></span>
                </div>
                {msg.show && msg.type === "password" && <p className="text-[14px] text-[#EB5A46] !mt-0">{msg.msg}</p>}
                {msg.show && msg.type === "general" &&
                    <p className={`text-[14px] ${msg.msg === "Your account created successfully" ? "green" : "red"} !mt-0`}>{msg.msg}</p>}
                <p className="text-[12px] text-[#5E6C84] leading-[16px]">By signing up, you confirm that you've read and
                    accepted our <a className="text-[#0052CC] hover:underline" target="_blank" href="#">Terms of
                        Service</a> and <a className="text-[#0052CC] hover:underline" target="_blank" href="#">Privacy
                        Policy</a>.</p>
                <button
                    className="bg-[#0052cc] text-[#ffffff] font-bold hover:bg-[#0065ff] py-[0.6em] px-[1.3em] rounded-[0.3em]">
                    Sign up
                </button>
                <a href="/login" className="text-[#0052cc] text-[14px] hover:underline">Already have an account? Log
                    in</a>
            </form>
            {loading && <Loading/>}
        </section>
    );
}
export default Signup;

const handleSignup = async (e, setMsg,setLoading) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.set("role", "user");
    const formObject = Object.fromEntries(formData);
    const {username, email, password} = formObject;
    if (!username.match("^[a-zA-z\\d]+$")) setMsg({show: true, msg: "Invalid username", type: "username"});
    else if (!email.match("^[a-z\\d!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z\\d!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-z\\d](?:[a-z\\d-]*[a-z\\d])?\\.)+[a-z\\d](?:[a-z\\d-]*[a-z\\d])?$")) setMsg({
        show: true,
        msg: "Invalid email",
        type: "email"
    });
    else {
        setLoading(true);
        const reqBody = JSON.stringify({user: formObject});
        console.log("Req Body: ", reqBody);
        const url = "http://localhost:8080/api/user/signup";
        await fetch(url, {
            method: 'post',
            body: reqBody,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            res.json().then(resBody => {
                setLoading(false);
                    if (res.status === 201) {
                        setMsg({show: true, msg: "Your account created successfully", type: "general"});
                        form.reset();
                        window.location.pathname = "/login";
                    } else if (resBody.type === "username") setMsg({
                        show: true,
                        msg: "Username not available",
                        type: "username"
                    });
                    else if (resBody.type === "email") setMsg({
                        show: true,
                        msg: "An account already exists against this email",
                        type: "email"
                    });
                    else setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
                }
            ).catch(err => {
                setMsg({show: true, msg: "An error occurred while signup, please try again", type: "general"});
                console.log(err);
            });
        }).catch((err) => {
            console.log("ERROR");
            console.log(err);
        });
    }

}


export const togglePasswd = (e) => {
    const btn = e.target;
    const passwd = e.target.previousSibling;
    if (passwd.type === "password") {
        passwd.type = "text";
        btn.classList.remove("fa-eye");
        btn.classList.add("fa-eye-slash");
    } else {
        passwd.type = "password";
        btn.classList.remove("fa-eye-slash");
        btn.classList.add("fa-eye");

    }
}
