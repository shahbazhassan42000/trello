import axios from "axios";
import { API_URL } from "./utils";

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    axios.request({
        baseURL: API_URL,
        url: "/card",
        headers: {"Content-type": "application/json;charset=UTF-8", "authorization": `Bearer ${user && user.token}`}
    }).catch((err) => {
        localStorage.removeItem("user");
    });
}
