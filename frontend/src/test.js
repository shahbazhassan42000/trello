import {includes} from "lodash";

const users = {
    Admin: "admin",
    User: "user",
};

console.log(includes(users, "admin"));
