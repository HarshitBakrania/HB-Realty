import { InputBox } from "../components/InputBox";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { listData } from "../lib/testData";
import PropertyCard from "../components/PropertyCard";
import { SelectFilter } from "../components/SelectFilter";

export const ListPage = () => {
    const data = listData;
    return (
        <div>
            <NavBar />
            <div className="grid grid-cols-5 bg-background-color">
                <div className= " px-10 py-5 space-y-10 h-[100vh] col-span-1 border-zinc-900 border-r-2 text-white">
                    <div className="text-xl font-semibold">
                        Filters
                    </div>
                    <div>
                        <InputBox label="Location" placeholder="City Location" type="text"/>
                    </div>
                    <div className="flex justify-between">
                        <SelectFilter label="Type" name="type" options={["Any","Buy", "Rent"]} />
                        <SelectFilter label="Property" name="property" options={["Any", "Apartment", "House", "Land"]} />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col max-w-24">
                            <label>Min Price</label>
                            <input type="number" className="text-black"></input>
                        </div>
                        <div className="flex flex-col max-w-24">
                            <label>Max Price</label>
                            <input type="number" className="text-black"></input>
                        </div>
                    </div>
                    <SelectFilter label="Bedrooms" name="bedroom" options={["Any", "1", "2", "3+"]} />
                    <Button label="Search" onClick={() => {}}/>

                </div>
                <div className="col-span-2 text-white space-y-5 p-8">
                    {data.map(item=>(
                        <PropertyCard key={item.id} item={item}/>
                    ))}
                </div>
                <div className="col-span-2 text-white">Map</div>
            </div>
        </div>
    );
}

function TypeFilter(){
    return(
        <div className="flex flex-col w-24 space-y-1">
            <label>Type</label>
            <select name="type" className="text-black">
                <option value="">Any</option>
                <option value="2">Buy</option>
                <option value="3">Rent</option>
            </select>
        </div>
    )
}

function PropertyFilter(){
    return(
        <div className="flex flex-col w-32 space-y-1 ">
            <label>Property Type</label>
            <select name="property" className="text-black">
                <option value="">Any</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
            </select>
        </div>
    )
}

function BedroomFilter(){
    return(
        <div className="flex flex-col w-24 space-y-1">
            <label>Bedrooms</label>
            <select name="bedroom" className="text-black">
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
            </select>
        </div>

    )
}