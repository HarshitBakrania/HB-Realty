import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { notificationAtom } from "../atoms/notification"

export default function useNotificationStore(){
    const [notification, setNotification] = useRecoilState(notificationAtom);

    const decrease = async() =>{
        setNotification((prev) => prev - 1);
    }

    return{
        notification, 
        decrease                                                                                      
    }
} 