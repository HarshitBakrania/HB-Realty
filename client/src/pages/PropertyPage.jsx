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
        {
          withCredentials: true,
        }
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

  return (
    <div>
      <NavBar />
      <div className="bg-background-color h-full grid grid-cols-3 text-white">
        <div className="col-span-2 px-32 py-10 space-y-2 border-r border-slate-600">
          <ImageGallery images={post.images} />
          <div className="space-y-8">
            <div className="text-4xl font-bold mt-10">{post.title}</div>
            <div className="flex text-xl text-gray-300">
              <MapPin />
              <div className="pl-2">{post.address}</div>
            </div>
            <div
              className="text-2xl text-gray-300"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.description),
              }}
            ></div>
            <div className="text-2xl bg-navbar-color max-w-max px-4 py-2 rounded-lg text-black">
              ${post.price}
            </div>
          </div>
        </div>
        <div className="col-span-1 px-14 py-10">
          <div className="text-2xl font-semibold">General</div>
          <div className="text-white grid grid-cols-2 font-semibold text-xl bg-secondary-color p-5 rounded-lg mt-2">
            <div className="space-y-4">
              <div className="flex">
                <CheckCircle />
                {capitalizeFirstLetter(post.type)}
              </div>
              <div className="flex">
                <CheckCircle />
                {capitalizeFirstLetter(post.property)}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex">
                <CheckCircle />
                {post.postDetail.utilities === "Yes"
                  ? "Furnished"
                  : "Not Furnished"}
              </div>
              <div className="flex">
                <CheckCircle />
                Pets {post.postDetail.pet}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="py-10 text-2xl font-semibold max-w-fit">
              Features
              <div className="bg-secondary-color text-xl py-6 px-8 space-y-6 rounded-xl mt-2">
                <div className="flex space-x-3">
                  <RulerIcon />
                  <div>{post.postDetail.size}sq feet</div>
                </div>
                <div className="flex space-x-3">
                  <img src={Bed} className="size-7" alt="Bedroom" />
                  <div>{post.bedroom} Bedrooms</div>
                </div>
                <div className="flex space-x-3">
                  <BathroomIcon />
                  <div>{post.bathroom} Bathrooms</div>
                </div>
              </div>
            </div>
            <div className="text-2xl font-semibold py-10">
              Nearby Places
              <div className="bg-secondary-color text-xl py-5 px-8 mt-2 rounded-lg max-w-fit space-y-2">
                <div className="flex items-center">
                  <SchoolIcon />
                  <div className="pl-3">
                    <div>School</div>
                    <div className="text-xs font-thin">
                      {post.postDetail.school > 999
                        ? post.postDetail.school / 1000 + "km"
                        : post.postDetail.school + "m"}{" "}
                      away
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <HospitalIcon />
                  <div className="pl-3">
                    <div>Hospitals</div>
                    <div className="text-xs font-thin">
                      {post.postDetail.hospital > 999
                        ? post.postDetail.hospital / 1000 + "km"
                        : post.postDetail.hospital + "m"}{" "}
                      away
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <RestaurantIcon />
                  <div className="pl-3">
                    <div>Restaurants</div>
                    <div className="text-xs font-thin">
                      {post.postDetail.restaurant > 999
                        ? post.postDetail.restaurant / 1000 + "km"
                        : post.postDetail.restaurant + "m"}{" "}
                      away
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-96">
            <div className="text-2xl font-semibold">Location</div>
            <Map items={[post]} />
            <div className="flex mt-5">
              <Button
                label={saved ? "Place is saved" : "Save Place"}
                onClick={savePost}
              >
                <Bookmark />
              </Button>
            </div>
          </div>
          <div className="mt-32">
            <div className="font-semibold text-2xl">Owner Details: </div>
            <div className=" bg-secondary-color mt-2 rounded-lg p-5 max-w-fit">
              <div className="font-semibold text-2xl flex items-center">
                {post.user.username}
                <img
                  src={post.user.avatar}
                  className="rounded-full ml-5 size-20"
                />
              </div>
              <div className="flex mt-6">
                <Button label="Send a message">
                  <TextIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ImageGallery = ({ images }) => (
  <div className="grid grid-cols-4 gap-2">
    <div className="col-span-3 h-full">
      <img
        src={images[0]}
        alt="Main"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div className="grid grid-rows-3 gap-2 h-full">
      {images.slice(1, 4).map((img, index) => (
        <div key={index} className="relative h-full">
          <img
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          {index === 2 && images.length > 4 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <span className="text-white text-2xl">+{images.length - 4}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
