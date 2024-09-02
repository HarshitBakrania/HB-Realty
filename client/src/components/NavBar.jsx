import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "./icons/icons";
import useNotificationStore from "../store/hooks/useNotificationStore";

export default function NavBar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { notification } = useNotificationStore();

  useEffect(() => {
    console.log("Current notification count: ", notification);
  }, [notification]);

  return (
    <div className="flex justify-between p-8 bg-navbar-color">
      <div className="sm:pl-20" onClick={() => navigate("/")}>
        <HomeIcon />
      </div>
      <div className="sm:pr-14">
        <div className="flex justify-end space-x-5 cursor-pointer flex-row">
          <NavBarButtons
            label="Buy"
            onClick={() => {
              navigate("/list?type=buy");
            }}
          />
          <NavBarButtons
            label="Rent"
            onClick={() => navigate("/list?type=rent")}
          />
          <NavBarButtons label="Contact" />
          <NavBarButtons label="About" />
          {currentUser ? (
            <div className="flex space-x-5">
              <NavBarButtons
                label={"Profile"}
                onClick={() => navigate("/user")}
              />
              <div>
                <MessageIcon notificationCount={notification} />
              </div>
            </div>
          ) : (
            <NavBarButtons label="Login" onClick={() => navigate("/signin")} />
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

const MessageIcon = ({ notificationCount }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/user/messages")}>
      <button
        type="button"
        className="relative inline-flex items-center text-sm font-medium text-center text-white"
      >
        <svg
          className="w-6 h-6 hover:fill-slate-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="#666666"
          viewBox="0 0 20 16"
        >
          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
        </svg>
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
          {notificationCount}
        </div>
      </button>
    </div>
  );
};
