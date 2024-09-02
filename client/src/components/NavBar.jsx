import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HomeIcon, NavBarButtons, MessageIcon } from "./icons/icons";
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
              <div onClick={() => navigate("/user/messages")}>
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
