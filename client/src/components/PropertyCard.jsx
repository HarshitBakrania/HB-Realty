import Bed from "../assets/bed.svg"
import Bathroom from "../assets/bathroom.svg"
export default function PropertyCard({item}){
    return (
        <div className="grid grid-cols-5">
            <img src={item.img} className="col-span-2 rounded-lg"></img>
            <div className="col-span-3 pl-3 space-y-2 grid grid-rows-4">
                <div className="text-2xl font-semibold row-span-1">Apartment {item.id}</div>
                <div className="flex text-neutral-400 text-sm row-span-1"><MapPin />{item.address}</div>
                <div className="flex row-span-1 items-center justify-between">
                    <div className="flex">
                        <img src={Bed} className/>
                        <div className="pl-2">
                            {item.bedroom} Bedrooms
                        </div>
                    </div>
                    <div className="flex">
                        <img src={Bathroom} />
                        <div className="pl-2">
                            {item.bathroom} Bathrooms
                        </div>
                    </div>
                    
                </div>
                <div className="row-span-1">
                    ${item.price}
                </div>
            </div>
        </div>
    )
}

function MapPin(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
}
