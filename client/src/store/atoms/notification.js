import axios from "axios";
import { useContext } from "react";
import { atom, selector } from "recoil";
import { AuthContext } from "../../context/AuthContext";

export const notificationAtom = atom({
  key: "notificationAtom",
  default: selector({
    key: "notificationAtomSelector",
    get: async () => {
      const { currentUser } = useContext(AuthContext);
      if (currentUser) {
        const res = await axios.get(
          "http://localhost:3000/api/users/notification",
          {
            withCredentials: true,
          }
        );
        return res.data;
      }
    },
  }),
});
