import Bed from "../assets/bed.svg";
import { useNavigate } from "react-router-dom";
import { BathroomIcon, MapPin } from "./icons/icons";
export default function PropertyCard({ item }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-5 bg-secondary-color rounded-2xl border border-neutral-800">
      <div className="col-span-3 rounded-lg overflow-hidden w-full aspect-video">
        <img
          src={item.images}
          className="w-full h-full object-cover"
        ></img>
      </div>

      <div className="col-span-2 pl-3 space-y-5 hover:cursor-pointer">
        <div
          onClick={() => {
            navigate(`/posts/${item.id}`);
          }}
          className="text-3xl font-semibold pb-10"
        >
          {item.title}
        </div>
        <div className="flex text-neutral-400 text-lg pb-10">
          <MapPin />
          {item.address}
        </div>
        <div className="flex flex-col space-y-3 pb-10 text-neutral-300">
          <div className="flex">
            <img src={Bed} className="size-10"/>
            <div className="pl-2">{item.bedroom} Bedrooms</div>
          </div>
          <div className="flex">
            <BathroomIcon />
            <div className="pl-2">{item.bathroom} Bathrooms</div>
          </div>
        </div>
        <div className=" bg-navbar-color text-slate-800 max-w-max py-2 px-3 text-2xl font-normal rounded-lg">${item.price}</div>
      </div>
    </div>
  );
}
