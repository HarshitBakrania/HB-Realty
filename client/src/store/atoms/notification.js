import axios from "axios";
import { atom, selector } from "recoil";

export const notificationAtom = atom({
    key: "notificationAtom",
    default: selector({
        key: "notificationAtomSelector",
        get: async() =>{
            const res = await axios.get("http://localhost:3000/api/users/notification", {
                withCredentials: true
            });
            console.log(res.data);
            return res.data;
        }
    })
});
