import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavBarButtons, MessageIcon } from "./icons/icons";
import logo from "../../public/HB-Realty.jpg";
import useNotificationStore from "../store/hooks/useNotificationStore";

export default function NavBar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { notification } = useNotificationStore();

  useEffect(() => {
    console.log("Current notification count: ", notification);
  }, [notification]);

  return (
    <div className="flex justify-between px-32 py-6 bg-navbar-color items-center">
      <div>
        <img src={logo} className="w-12 h-12 hover:cursor-pointer rounded-sm" onClick={() => navigate("/")}/>
      </div>
      <div>
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
