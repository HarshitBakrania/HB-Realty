import { useContext } from "react";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useUserPosts } from "../hooks/useUserPosts";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";

export const UserPage = () => {
  const { posts, loading } = useUserPosts();
  const userPosts = posts.userPosts;
  const savedPosts = posts.savedPosts;
  const { updateUser, currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  async function LogoutUser() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="text-white bg-background-color lg:grid lg:grid-cols-4 lg:px-14">
        <div className="bg-secondary-color max-h-max p-10 space-y-5 lg:col-span-1 lg:m-10 lg:order-last">
          <div className="flex justify-between">
            <div className="text-2xl lg:text-3xl font-bold">Account Information</div>
            <Button label="Update Profile" onClick={() => navigate("/user/update")} />
          </div>
          <div className="text-lg lg:text-xl font-semibold">
            <div className="flex">
              <div className="py-6">Avatar:</div>
              {currentUser.avatar ? (
                <img src={currentUser.avatar} className="rounded-full size-20 ml-4" />
              ) : null}
            </div>
            <div className="pt-4">Username: {currentUser.username}</div>
            <div className="py-6">Email Address: {currentUser.email}</div>
            <div className="pt-2 font-normal">
              <Button label="Logout" onClick={LogoutUser} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="py-8 px-6 lg:py-16 lg:px-10 flex justify-between">
            <div className="text-2xl lg:text-4xl font-semibold">Your Listings</div>
            <Button
              label="Create New Listing"
              className="lg:text-lg"
              onClick={() => {
                navigate("/posts/create");
              }}
            />
          </div>
          <div className="px-6 lg:px-8 mt-6 lg:mt-8 mb-20 space-y-12">
            {userPosts ? userPosts.map((item) => <PropertyCard key={item.id} item={item} />) : null}
          </div>
          <div className="text-2xl lg:text-4xl font-semibold text-center pb-6 pt-12 border-t border-slate-800 mx-4">
            Saved Posts
          </div>
          <div className="px-6 lg:px-8 mt-6 lg:mt-8 pb-36 space-y-12">
            {savedPosts ? savedPosts.map((item) => <PropertyCard key={item.id} item={item} />) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
