import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NavBarButtons, MessageIcon } from "./icons/icons";
import logo from "/HB-Realty.jpg";
import useNotificationStore from "../store/hooks/useNotificationStore";
import defaultAvatar from "./icons/346569.png";

export default function NavBar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { notification } = useNotificationStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Current notification count: ", notification);
  }, [notification]);

  return (
    <nav className="bg-white shadow-md w-full border-b border-gray-200">
      <div className="container mx-auto px-7 py-3 flex justify-between items-center text-center">
        {/* Logo */}
        <div>
          <a href="/" onClick={() => navigate("/")}>
            <img
              src={logo}
              className="w-12 h-12 hover:cursor-pointer rounded-sm"
              alt="logo"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <div className="flex justify-end space-x-5 cursor-pointer">
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
              <div className="flex space-x-8 items-center">
                <div onClick={() => navigate("/user/messages")}>
                  <MessageIcon notificationCount={notification} />
                </div>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                    onClick={() => navigate("/user")}
                  />
                ) : (
                  <img 
                    src={defaultAvatar}
                    className="w-10 h-10 rounded-full"
                    onClick={() => navigate("/user")}
                  ></img>
                )}
              </div>
            ) : (
              <NavBarButtons
                label="Login"
                onClick={() => navigate("/signin")}
              />
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-end space-y-4 px-7 pb-4 bg-white shadow-lg">
            <NavBarButtons
              label="Buy"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/list?type=buy");
              }}
            />
            <NavBarButtons
              label="Rent"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/list?type=rent");
              }}
            />
            <NavBarButtons label="Contact" />
            <NavBarButtons label="About" />
            {currentUser ? (
              <>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/user");
                    }}
                  />
                ) : (
                  <img 
                    src={defaultAvatar}
                    alt="default avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate("/user");
                    }}
                  />
                )}
                <div
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/user/messages");
                  }}
                >
                  <MessageIcon notificationCount={notification} />
                </div>
              </>
            ) : (
              <NavBarButtons
                label="Login"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/signin");
                }}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}