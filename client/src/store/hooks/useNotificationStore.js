import { useRecoilValue, useSetRecoilState } from "recoil"
import { notificationAtom } from "../atoms/notification"
import { useEffect, useState } from "react"

export default function useNotificationStore() {
    const recoilNotification = useRecoilValue(notificationAtom);
    const setRecoilNotification = useSetRecoilState(notificationAtom);
    const [notification, setNotification] = useState(0);

    useEffect(() => {
        setNotification(recoilNotification ?? 0);
    }, [recoilNotification]);

    const decrease = () => {
        setRecoilNotification((prev) => {
            const newValue = Math.max(0, prev - 1);
            setNotification(newValue);
            return newValue;
        });
    }

    return {
        notification,
        decrease
    }
}