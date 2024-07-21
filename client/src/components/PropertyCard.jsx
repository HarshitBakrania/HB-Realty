import Bed from "../assets/bed.svg"
import Bathroom from "../assets/bathroom.svg"
import MapPin from "./MapPin"
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


