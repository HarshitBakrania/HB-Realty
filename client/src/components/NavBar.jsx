import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "./icons/icons";
import useNotificationStore from "../store/hooks/useNotificationStore";

export default function NavBar() {
  const navigate = useNavigate();
  // const { number, fetch } = useNotificationStore();
  // console.log(number)
  const { notification } = useNotificationStore();
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if(currentUser){
  //     fetch();
  //   }
  // },[fetch]);

  return (
    <div className="flex justify-between p-8 bg-navbar-color">
      <div className="sm:pl-20" onClick={() => navigate("/")}>
        <HomeIcon />
      </div>
      <div className="sm:pr-10 ">
        <div className="flex justify-end space-x-4 cursor-pointer flex-row">
          <NavBarButtons label="Buy" />
          <NavBarButtons label="Rent" />
          <NavBarButtons label="Contact" />
          <NavBarButtons label="About" />
          {currentUser ? (
            <div className="flex space-x-2">
              <NavBarButtons
                label={"Profile " + notification}
                onClick={() => navigate("/user")}
              />
              <MessageIcon />
            </div>
          ) : (
            <NavBarButtons
              label="Login"
              onClick={() => navigate("/signin")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const NavBarButtons = ({ label, onClick }) => {
  return (
    <div onClick={onClick} className="no-underline hover:underline text-lg">
      {label}
    </div>
  );
};

const MessageIcon = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/user/messages")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    </div>
  );
};