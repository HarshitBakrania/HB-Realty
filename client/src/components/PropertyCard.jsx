import Bed from "../assets/bed.svg";
import { useNavigate } from "react-router-dom";
import { BathroomIcon } from "./icons/icons";

export default function PropertyCard({ item }) {
  const navigate = useNavigate();

  const typeLabel = item.type === "rent" ? "For Rent" : "For Sale";

  return (
    <div
      className="group flex flex-col sm:flex-row bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 hover:shadow-lg hover:shadow-black/40 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/posts/${item.id}`)}
    >
      {/* Image */}
      <div className="relative sm:w-56 md:w-64 lg:w-72 xl:w-80 flex-shrink-0">
        <img
          src={item.images[0]}
          className="w-full h-52 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={item.title}
        />
        {/* Type badge overlaid on image */}
        <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {typeLabel}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 p-4 md:p-5 gap-3">
        {/* Title */}
        <div>
          <h3 className="text-white text-base md:text-lg lg:text-xl font-semibold leading-snug group-hover:text-navbar-color transition-colors duration-200 line-clamp-2">
            {item.title}
          </h3>
          {/* Address */}
          <div className="flex items-start gap-1.5 mt-2 text-neutral-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="line-clamp-1">{item.address}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800" />

        {/* Features row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-neutral-300 text-sm">
          <div className="flex items-center gap-1.5">
            <img src={Bed} className="w-6 h-6 flex-shrink-0" alt="Bedroom" />
            <span>{item.bedroom} {item.bedroom === 1 ? "Bed" : "Beds"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BathroomIcon size={18} />
            <span>{item.bathroom} {item.bathroom === 1 ? "Bath" : "Baths"}</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div className="text-white font-bold text-lg md:text-xl lg:text-2xl">
            ${item.price.toLocaleString()}
            {item.type === "rent" && <span className="text-neutral-400 font-normal text-sm ml-1">/mo</span>}
          </div>
          <span className="text-xs md:text-sm text-neutral-400 group-hover:text-white group-hover:underline transition-colors duration-200">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}