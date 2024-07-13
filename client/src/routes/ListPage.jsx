import { InputBox } from "../components/InputBox";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

export const ListPage = () => {
    return (
        <div>
            <NavBar />
            <div className="grid grid-cols-5">
                <div className= "bg-secondary-color px-10 py-5 space-y-10 h-[100vh] col-span-1 border-r text-white">
                    <div className="text-xl font-semibold">
                        Filters
                    </div>
                    <div>
                        <InputBox label="Location" placeholder="City Location" type="text"/>
                    </div>
                    <div className="flex justify-between">
                        <TypeFilter />
                        <PropertyFilter />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col max-w-24">
                            <label>Min Price</label>
                            <input type="number"></input>
                        </div>
                        <div className="flex flex-col max-w-24">
                            <label>Max Price</label>
                            <input type="number"></input>
                        </div>
                    </div>
                    <BedroomFilter />
                    <Button label="Search" onClick={() => {}}/>

                </div>
                <div className="col-span-2">Properties</div>
                <div className="col-span-2">Map</div>
            </div>
        </div>
    );
}

function TypeFilter(){
    return(
        <div className="flex flex-col w-24 space-y-1">
            <label>Type</label>
            <select name="type">
                <option value="">Any</option>
                <option value="2">Buy</option>
                <option value="3">Rent</option>
            </select>
        </div>
    )
}

function PropertyFilter(){
    return(
        <div className="flex flex-col w-32 space-y-1">
            <label>Property Type</label>
            <select name="property">
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
            <select name="bedroom">
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
            </select>
        </div>

    )
}