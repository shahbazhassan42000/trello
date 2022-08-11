import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    axios.request({
        baseURL: 'http://localhost:8080/api',
        url: "/card",
        headers: {"Content-type": "application/json;charset=UTF-8", "authorization": `Bearer ${user && user.token}`}
    }).catch((err) => {
        localStorage.removeItem("user");
    });
}
