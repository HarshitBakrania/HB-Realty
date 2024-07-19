import Button from "../components/Button";
import { InputBox } from "../components/InputBox";
import NavBar from "../components/NavBar";
import { SelectFilter } from "../components/SelectFilter";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export const NewPostPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
        console.log(inputs)
    }
 
    return (
       <div className="bg-background-color">
           <NavBar />
           <div className="grid grid-cols-3">
            <div className="col-span-2">
                <div className="text-3xl font-semibold text-white px-36 pt-20">
                    Create a new Listing
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-y-7 gap-x-12 text-white px-44 pt-10">
                    <InputBox label="Title" type="text" name="title"/>  
                    <InputBox label="Price" type="number" name="description"/>
                    <InputBox label="Address" type="text" name="address"/>
                    <InputBox label="City" type="text" name="city"/>
                    <InputBox label="Bedrooms" type="number" name="bedroom"/>
                    <InputBox label="Bathrooms" type="number" name="bathroom"/>
                    <InputBox label="Bathrooms" type="number" name="bathroom"/>
                    <InputBox label="Total Size" type="number" name="size" />
                    <div className="flex justify-between py-4">
                        <SelectFilter label="Type" name="type" options={["Buy", "Rent"]} />
                        <SelectFilter label="Property" name="property" options={["Apartment", "House", "Land"]} />
                    </div>
                    <InputBox label="Latitude" type="text" name="latitude" />
                    <InputBox label="Longitude" type="text" name="longitude" />
                    <div className="py-4 flex justify-between">
                        <SelectFilter label="Furnished" name="furnished" options={["Yes", "No"]} />
                        <SelectFilter label="Pets" name="pet" options={["Allowed", "Not Allowed"]} />
                    </div>
                    <InputBox label="Schools Nearby" type="number" name="school" />
                    <InputBox label="Hospitals Nearby" type="number" name="hospital" />
                    <InputBox label="Restaurants Nearby" type="number" name="restaurant" /> 
                </form>
                <div className="px-32 py-14 text-white space-y-2">
                    <div className="text-2xl">
                        Write a description
                    </div>
                    <ReactQuill theme="snow" name="description" />
                </div>
                <div className="max-w-40 mx-auto pb-20">
                    <Button label="Submit" />
                </div>
               
            </div>
            <div className="col-span-1 "> 
                TEST
            </div>
           </div>   
       </div>
    );
}