import Bed from "../assets/bed.svg";
import { useNavigate } from "react-router-dom";
import { BathroomIcon, MapPin } from "./icons/icons";

export default function PropertyCard({ item }) {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col sm:grid sm:grid-cols-5 bg-secondary-color rounded-2xl border border-neutral-800 overflow-hidden"
      onClick={() => navigate(`/posts/${item.id}`)}
    >
      <div className="sm:col-span-3 w-full">
        <img 
          src={item.images[0]} 
          className="w-full aspect-video object-cover" 
          alt={item.title} 
        />
      </div>

      <div className="sm:col-span-2 p-4 sm:p-3 md:p-4 lg:p-6 flex flex-col justify-between space-y-3 sm:space-y-2 md:space-y-3 lg:space-y-4">
        <div
          className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold hover:text-navbar-color transition-colors"
        >
          {item.title}
        </div>
        
        <div className="flex items-center text-neutral-400 text-sm sm:text-xs md:text-sm lg:text-base">
          <div><MapPin /></div>
          <div className="ml-2">{item.address}</div>
        </div>
        
        <div className="flex items-center text-neutral-300 text-xs sm:text-xs md:text-sm lg:text-base">
          <img src={Bed} className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" alt="Bedroom" />
          <div className="pl-2">{item.bedroom} {item.bedroom === 1 ? 'Bedroom' : 'Bedrooms'}</div>
        </div>
        
        <div className="flex items-center text-neutral-300 text-xs sm:text-xs md:text-sm lg:text-base">
          <BathroomIcon className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          <div className="pl-2">{item.bathroom} {item.bathroom === 1 ? 'Bathroom' : 'Bathrooms'}</div>
        </div>

        <div>
          <div className="bg-navbar-color text-slate-800 w-fit py-1 px-3 sm:py-1 sm:px-2 md:py-2 md:px-3 lg:py-2 lg:px-4 text-base sm:text-sm md:text-base lg:text-lg xl:text-xl font-normal rounded-lg">
            ${item.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}