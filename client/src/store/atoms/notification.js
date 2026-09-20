import axios from "axios";
import { atom, selector } from "recoil";

export const notificationAtom = atom({
  key: "notificationAtom",
  default: selector({
    key: "notificationAtomSelector",
    get: async () => {
      const storedData = JSON.parse(localStorage.getItem("user") || "null");
      const sevenDays = 1000 * 60 * 60 * 24 * 7;
      let currentUser = null;

      if (storedData && storedData.timestamp) {
        const timeDifference = new Date().getTime() - storedData.timestamp;
        if (timeDifference < sevenDays) {
          currentUser = storedData.user;
        }
      }

      if (currentUser) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/notification`,
            {
              withCredentials: true,
            }
          );
          return res.data;
        } catch (error) {
          console.log("Failed to fetch notifications:", error);
          return 0;
        }
      }
      return 0;
    },
  }),
});
