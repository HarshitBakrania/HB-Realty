import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const[currentUser, setCurrentUser] = useState(() =>{
        const storedData = JSON.parse(localStorage.getItem("user"));
        const sevenDays = 1000 * 60 * 60 * 24 * 7;

        if(storedData){
            const timeDifference = new Date().getTime() - storedData.timestamp;
            if(timeDifference < sevenDays){
                return storedData.user;
            }else{
                localStorage.removeItem("user");
                return null;
            }
        }
    });
    
    const updateUser = (data) =>{
        setCurrentUser(data)
    };

    const logout = () =>{
        setCurrentUser(null);
        localStorage.removeItem("user");
    }

    useEffect(() => {
        if (currentUser) {
          const userWithTimestamp = {
            user: currentUser,
            timestamp: new Date().getTime()
          };
          localStorage.setItem("user", JSON.stringify(userWithTimestamp));
        }else{
            localStorage.removeItem("user");
        }
      }, [currentUser]);

    return <AuthContext.Provider value={{ currentUser,updateUser, logout }}>{children}</AuthContext.Provider>;
}