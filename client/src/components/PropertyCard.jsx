import Bed from "../assets/bed.svg";
import { useNavigate } from "react-router-dom";
import { BathroomIcon, MapPin } from "./icons/icons";

export default function PropertyCard({ item }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-5 bg-secondary-color rounded-2xl border border-neutral-800">
      <div className="col-span-3 rounded-lg overflow-hidden w-full aspect-video">
        <img src={item.images} className="w-full h-full object-cover" alt={item.title} />
      </div>

      <div className="col-span-2 p-3 hover:cursor-pointer flex flex-col justify-between h-full">
        <div
          onClick={() => {
            navigate(`/posts/${item.id}`);
          }}
          className="text-3xl font-semibold"
        >
          {item.title}
        </div>
        
        <div className="flex items-center text-neutral-400 text-lg">
          <MapPin />
          <span className="ml-2">{item.address}</span>
        </div>
        
        <div className="flex items-center text-neutral-300">
          <img src={Bed} className="size-6" alt="Bedroom" />
          <div className="pl-2">{item.bedroom} Bedrooms</div>
        </div>
        
        <div className="flex items-center text-neutral-300">
          <BathroomIcon />
          <div className="pl-2">{item.bathroom} Bathrooms</div>
        </div>
        
        <div>
          <div className="bg-navbar-color text-slate-800 max-w-max py-2 px-4 text-2xl font-normal rounded-lg">
            ${item.price}
          </div>
        </div>
      </div>
    </div>
  );
}