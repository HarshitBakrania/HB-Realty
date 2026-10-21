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
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  async function LogoutUser() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-color">
      <NavBar />
      <div className="flex-1 text-white lg:grid lg:grid-cols-4 lg:px-10 xl:px-14">

        {/* ── Account Info Sidebar ── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 space-y-5 m-4 sm:m-6 lg:col-span-1 lg:m-8 lg:order-last lg:h-fit lg:sticky lg:top-20">
          {/* Heading + Update button */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold">Account Info</div>
            <Button
              label="Edit Profile"
              onClick={() => navigate("/user/update")}
              className="text-sm"
            />
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 py-2">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                className="rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover ring-2 ring-white/20"
                alt="avatar"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">
                {currentUser.username?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-semibold text-lg">{currentUser.username}</div>
              <div className="text-sm text-gray-400">{currentUser.email}</div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <Button label="Logout" onClick={LogoutUser} className="w-full" />
          </div>
        </div>

        {/* ── Listings Column ── */}
        <div className="lg:col-span-3 px-4 sm:px-6 lg:px-8">
          {/* Your Listings header */}
          <div className="flex flex-wrap gap-3 items-center justify-between py-6 sm:py-8 lg:py-10">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Your Listings</div>
            <Button
              label="+ New Listing"
              className="text-sm sm:text-base"
              onClick={() => navigate("/posts/create")}
            />
          </div>

          {loading ? (
            <div className="text-center text-slate-400 py-10 text-lg">Loading…</div>
          ) : userPosts?.length ? (
            <div className="space-y-5 mb-16">
              {userPosts.map((item) => <PropertyCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="text-center text-slate-500 py-10">No listings yet.</div>
          )}

          {/* Saved Posts */}
          <div className="border-t border-slate-800 pt-6 sm:pt-8 pb-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8">Saved Posts</div>
            {loading ? (
              <div className="text-center text-slate-400 py-10 text-lg">Loading…</div>
            ) : savedPosts?.length ? (
              <div className="space-y-5 pb-16">
                {savedPosts.map((item) => <PropertyCard key={item.id} item={item} />)}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-10 pb-16">No saved posts yet.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
