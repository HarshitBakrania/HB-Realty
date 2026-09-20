import Button from "../components/Button";
import NavBar from "../components/NavBar";
import Bed from "../assets/bed.svg";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import DOMPurify from "dompurify";
import { Map } from "../components/Map";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import TextIcon, {
  MapPin,
  CheckCircle,
  Bookmark,
  BathroomIcon,
  RulerIcon,
  SchoolIcon,
  HospitalIcon,
  RestaurantIcon,
} from "../components/icons/icons";
import Footer from "../components/Footer";

export const PropertyPage = () => {
  const { id } = useParams();
  const { post, loading } = usePost({ id });
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && post) {
      setSaved(post.isSaved || false);
    } else if (!currentUser) {
      navigate("/signin");
    }
  }, [loading, post]);

  const savePost = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      navigate("/signin");
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/save`,
        { postId: post.id },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  };

  //TODO: add loading skeleton
  if (loading) return <div>Loading...</div>;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async function sendMessage() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chats`,
        { userIdToken: currentUser.id, receiverId: post.userId },
        { withCredentials: true }
      );
      navigate(`/user/messages`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="bg-background-color text-white">
        {/* Main layout: stacked on mobile/tablet, side-by-side on lg+ */}
        <div className="flex flex-col lg:grid lg:grid-cols-3">

          {/* ── LEFT: Gallery + Details ── */}
          <div className="lg:col-span-2 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-8 lg:py-10 space-y-2 lg:border-r lg:border-slate-600">
            <ImageGallery images={post.images} />
            <div className="space-y-6 lg:space-y-8">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 lg:mt-10">
                {post.title}
              </div>
              <div className="flex items-center text-base sm:text-lg md:text-xl text-gray-300">
                <MapPin />
                <div className="pl-2">{post.address}</div>
              </div>
              <div
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.postDetail.description),
                }}
              />
              <div className="text-lg sm:text-xl md:text-2xl bg-navbar-color max-w-max px-4 py-2 rounded-lg text-black">
                ${post.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Info Sidebar ── */}
          <div className="lg:col-span-1 px-4 sm:px-8 md:px-10 lg:px-14 py-8 lg:py-10 border-t border-slate-600 lg:border-t-0">

            {/* General */}
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">General</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Type",      value: capitalizeFirstLetter(post.type) },
                { label: "Property",  value: capitalizeFirstLetter(post.property) },
                { label: "Furnished", value: post.postDetail.utilities === "Yes" ? "Yes" : "No" },
                { label: "Pets",      value: post.postDetail.pet },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 flex flex-col gap-1">
                  <span className="text-xs text-white/40 uppercase tracking-wider">{label}</span>
                  <span className="text-sm sm:text-base font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {/* Features + Nearby Places */}
            <div className="flex flex-col sm:flex-row sm:gap-5 lg:flex-col xl:flex-row xl:gap-5 mt-8">

              {/* Features */}
              <div className="flex-1">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Features</p>
                <div className="bg-white/5 border border-white/10 rounded-xl divide-y divide-white/10">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="text-white/50 flex-shrink-0"><RulerIcon /></div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Size</div>
                      <div className="text-sm sm:text-base font-medium">{post.postDetail.size?.toLocaleString()} sq ft</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <img src={Bed} className="w-5 h-5 opacity-50 flex-shrink-0" alt="Bedrooms" />
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Bedrooms</div>
                      <div className="text-sm sm:text-base font-medium">{post.bedroom}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="text-white/50 flex-shrink-0"><BathroomIcon size={20} /></div>
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Bathrooms</div>
                      <div className="text-sm sm:text-base font-medium">{post.bathroom}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby Places */}
              <div className="flex-1 mt-6 sm:mt-0 lg:mt-6 xl:mt-0">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Nearby</p>
                <div className="bg-white/5 border border-white/10 rounded-xl divide-y divide-white/10">
                  {[
                    { icon: <SchoolIcon />,     label: "School",     dist: post.postDetail.school },
                    { icon: <HospitalIcon />,   label: "Hospital",   dist: post.postDetail.hospital },
                    { icon: <RestaurantIcon />, label: "Restaurant", dist: post.postDetail.restaurant },
                  ].map(({ icon, label, dist }) => (
                    <div key={label} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="text-white/50 flex-shrink-0">{icon}</div>
                        <span className="text-sm sm:text-base font-medium">{label}</span>
                      </div>
                      <span className="text-xs bg-white/10 border border-white/10 text-white/70 px-2.5 py-1 rounded-full font-medium flex-shrink-0">
                        {dist > 999 ? (dist / 1000).toFixed(1) + " km" : dist + " m"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-10 h-72 sm:h-80 lg:h-96">
              <div className="text-xl sm:text-2xl font-semibold mb-3">Location</div>
              <div className="isolate rounded-xl overflow-hidden h-56 sm:h-64 lg:h-72">
                <Map items={[post]} />
              </div>
              <div className="flex mt-5">
                <Button
                  label={saved ? "Place is saved" : "Save Place"}
                  onClick={savePost}
                >
                  <Bookmark />
                </Button>
              </div>
            </div>

            {/* Owner Details */}
            <div className="mt-16 sm:mt-24 lg:mt-32">
              <div className="font-semibold text-xl sm:text-2xl">Owner Details:</div>
              <div className="bg-white/5 border border-white/10 mt-2 rounded-lg p-4 sm:p-5 max-w-fit">
                <div className="font-semibold text-lg sm:text-2xl flex items-center flex-wrap gap-3">
                  {post.user.username}
                  <img
                    src={post.user.avatar}
                    className="rounded-full size-14 sm:size-20"
                    alt="owner avatar"
                  />
                </div>
                <div className="flex mt-4 sm:mt-6">
                  <Button label="Send a message" onClick={sendMessage}>
                    <TextIcon />
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ImageGallery = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prev = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, images.length]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 rounded-xl overflow-hidden">
        {/* Main image */}
        <div
          className="sm:col-span-3 h-52 sm:h-64 md:h-80 lg:h-96 cursor-zoom-in group relative overflow-hidden rounded-lg"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            alt="Main"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
              Click to expand
            </span>
          </div>
        </div>

        {/* Thumbnail column */}
        <div className="hidden sm:grid grid-rows-3 gap-2 h-64 md:h-80 lg:h-96">
          {images.slice(1, 4).map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg cursor-zoom-in group"
              onClick={() => openLightbox(index + 1)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-lg" />
              {index === 2 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <span className="text-white text-xl font-semibold">+{images.length - 4} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-10"
            onClick={closeLightbox}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm bg-white/10 px-3 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Prev Arrow */}
          {images.length > 1 && (
            <button
              className="absolute left-3 sm:left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all z-10"
              onClick={prev}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Active Image */}
          <img
            src={images[activeIndex]}
            alt={`Photo ${activeIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Arrow */}
          {images.length > 1 && (
            <button
              className="absolute right-3 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all z-10"
              onClick={next}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 overflow-x-auto max-w-[90vw]">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  className={`w-12 h-9 sm:w-16 sm:h-12 object-cover rounded cursor-pointer flex-shrink-0 transition-all duration-200 ${
                    i === activeIndex
                      ? "ring-2 ring-white opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
