import { InputBox } from "../components/InputBox";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { listData } from "../lib/testData";
import PropertyCard from "../components/PropertyCard";
import { SelectFilter } from "../components/SelectFilter";
import { Map } from "../components/Map";

export const ListPage = () => {
    const data = listData;
    return (
        <div>
            <NavBar />
            <div className="grid grid-cols-5 bg-background-color">
                <div className= " px-10 py-5 space-y-10 h-[100vh] col-span-1 border-slate-600 border-r text-white">
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
                <div className="col-span-2 text-white space-y-5 p-8 border-r border-slate-600">
                    {data.map(item=>(
                        <PropertyCard key={item.id} item={item}/>
                    ))}
                </div>
                <div className="col-span-2 text-white p-20 px-20 rounded-sm h-screen">
                    <Map items={data}/>
                </div>
            </div>
        </div>
    );
}

