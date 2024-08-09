import { InputBox } from "../components/InputBox";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { listData } from "../lib/testData";
import PropertyCard from "../components/PropertyCard";
import { SelectFilter } from "../components/SelectFilter";
import { Map } from "../components/Map";
import { usePosts } from "../hooks/usePosts";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

export const ListPage = () => {
    const { posts, loading } = usePosts();
    const[city, setCity] = useState("");
    const[minPrice, setMinPrice] = useState("");
    const[maxPrice, setMaxPrice] = useState("");
    const[type, setType] = useState("Any");
    const[property, setProperty] = useState("Any")
    const[bedroom, setBedroom] = useState(0);
    const navigate = useNavigate();

    if(loading){
        return <div>loading...</div>
    }

    const handleFilter = () => {
        const params = new URLSearchParams();
        if(city) params.append("city", city.toLowerCase());
        if(type && type !== "Any") params.append("type", type.toLowerCase());
        if(property && property !== "Any") params.append("property", property.toLowerCase());
        if(minPrice) params.append("minPrice", minPrice);
        if(maxPrice) params.append("maxPrice", maxPrice);
        if(bedroom && bedroom !== 0) params.append("bedroom", bedroom.toLowerCase());
        navigate(`/list?${params.toString()}`)
    };

    return (
        <div>
            <NavBar />
            <div className="grid grid-cols-6 bg-background-color">
                <div className= " px-10 py-5 space-y-10 col-span-1 border-slate-600 border-r text-white">
                    <div className="text-xl font-semibold">
                        Filters
                    </div>
                    <div>
                        <InputBox onChange={e =>{
                            setCity(e.target.value);
                        }} label="Location" placeholder="City Location" type="text"/>
                    </div>
                    <div className="flex justify-between">
                        <SelectFilter onChange={e =>{
                            setType(e.target.value);
                        }} value={type} label="Type" name="type" options={["Any","Buy", "Rent"]} />
                        <SelectFilter onChange={e =>{
                            setProperty(e.target.value);
                        }} value={property} label="Property" name="property" options={["Any", "Apartment", "House", "Land"]} />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col max-w-24">
                            <label>Min Price</label>
                            <input onChange={e =>{
                                setMinPrice(e.target.value);
                            }} type="number" className="text-black"></input>
                        </div>
                        <div className="flex flex-col max-w-24">
                            <label>Max Price</label>
                            <input onChange={e =>{
                                setMaxPrice(e.target.value);
                            }} type="number" className="text-black"></input>
                        </div>
                    </div>
                    <InputBox onChange={e =>{
                        setBedroom(e.target.value);
                    }} label="Bedrooms" name="bedroom" placeholder="Number of Bedrooms" type="number"/>
                    <Button label="Search" onClick={handleFilter}/>
                </div>
                <div className="col-span-3 text-white space-y-5 p-8 border-r border-slate-600">
                    {posts.map(item=>(
                        <PropertyCard key={item.id} item={item}/>
                    ))}
                </div>
                <div className="col-span-2 text-white p-10 rounded-sm h-screen">
                    <Map items={posts}/>
                </div>
            </div>
            <Footer />
        </div>
    );
}

