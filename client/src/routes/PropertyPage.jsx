import Bookmark from "../components/Bookmark"
import Button from "../components/Button"
import MapPin from "../components/MapPin"
import NavBar from "../components/NavBar"
import axios from "axios"
import TextIcon from "../components/TextIcon"

export const PropertyPage = () =>{

    return (
        <div>
            <NavBar />
            <div className="bg-background-color h-screen grid grid-cols-3 text-white">
                <div className="col-span-2 px-40 py-10 space-y-2 border-r border-slate-600">
                    <div className="py-10">
                        <img src="https://images.pexels.com/photos/276625/pexels-photo-276625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-96"/>
                    </div>
                    <div className="text-3xl font-bold grid grid-cols-4">
                        <div className="col-span-3">Test Title</div> 
                        <div className="col-span-1">
                            user info
                        </div>
                    </div>
                    <div className="flex">
                        <MapPin />
                        Address 1
                    </div>
                    <div className="text-2xl">
                        $100
                    </div>
                    <div className="text-xl">
                        Description
                    </div>
                </div>
                <div className="col-span-1 px-14 py-10">
                    <div className="text-2xl font-semibold">
                        General
                    </div>
                    <div className="text-white grid grid-cols-2 font-semibold text-xl bg-secondary-color p-5 rounded-lg mt-2">
                            <div className="space-y-4">
                                <div className="flex"><CheckCircle />Rent</div>
                                <div className="flex"><CheckCircle />Apartment</div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex"><CheckCircle />Furnished</div>
                                <div className="flex"><CheckCircle />Pets Allowed</div>
                            </div>
                    </div>
                    <div className="py-10 text-2xl font-semibold">
                        Features
                        <div className="bg-secondary-color text-xl p-5 space-y-6 rounded-xl mt-2">
                            <div>100sq feet</div>
                            <div>3 Bedrooms</div>
                            <div>4 Bathrooms</div>
                        </div>
                    </div>
                    <div className="text-2xl font-semibold">
                        Nearby Places
                        <div className="bg-secondary-color text-xl grid grid-cols-3 p-5">
                            <div className="col-span-1">
                                <div>School</div>
                                <div className="text-xs font-thin">1.2km away</div>
                            </div>
                            <div className="col-span-1">
                                <div>Hospitals</div>
                                <div className="text-xs font-thin">800m away</div>
                            </div>
                            <div className="col-span-1"> 
                                <div>Restaurants</div>
                                <div className="text-xs font-thin">100m away</div>
                            </div>      
                        </div>
                    </div>
                    <div className="mt-10 h-80">
                        Location
                    </div>
                    <div className="flex justify-between p-10">
                        <div className="flex">
                            <Button label="Send a message">
                                <TextIcon />
                            </Button>
                        </div>
                        <div className="flex">
                            <Button label="Save the post" >
                                <Bookmark />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CheckCircle = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}