import Button from "../components/Button";
import { InputBox } from "../components/InputBox";
import NavBar from "../components/NavBar";
import { SelectFilter } from "../components/SelectFilter";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import UploadWidget from "../components/UploadImage";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export const NewPostPage = () => {
    const[images, setImages] = useState([]);
    const[value, setValue] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
        console.log(inputs)

        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts`,{
                postData: {
                    title: inputs.title,
                    price: parseInt(inputs.price),
                    address: inputs.address,
                    city: inputs.city,
                    bedroom: parseInt(inputs.bedroom),
                    bathroom: parseInt(inputs.bathroom),
                    type: inputs.type.toLowerCase(),
                    property: inputs.property.toLowerCase(),
                    latitude: inputs.latitude,
                    longitude: inputs.longitude,
                    images: images,
                },
                postDetail:{
                    description: value,
                    utilities: inputs.furnished,
                    pet: inputs.pet,
                    size: parseInt(inputs.size),
                    school: parseInt(inputs.school),
                    hospital: parseInt(inputs.hospital),
                    restaurant: parseInt(inputs.restaurant)
                },
            },{
                withCredentials: true
            });
            navigate(`/posts/${response.data.id}`);
        }catch(error){
            console.log(error.response.data);
        }
    }

    const handleDeleteImage = (url) => {
        setImages((prev) => prev.filter((image) => image !== url));
    }
 
    return (
       <div className="bg-background-color">
           <NavBar />
           <div className="block lg:grid lg:grid-cols-3">
                <div className="lg:col-span-2 lg:border-r lg:border-slate-600">
                    <div className="text-2xl lg:text-3xl font-semibold text-white px-6 lg:px-36 pt-8 lg:pt-20">
                        Create a new Listing
                    </div>
                    <form onSubmit={handleSubmit} className="block lg:grid lg:grid-cols-3 lg:gap-y-7 lg:gap-x-12 text-white px-6 lg:px-44 pt-6 lg:pt-10 space-y-4 lg:space-y-0">
                        <InputBox label="Title" type="text" name="title"/>  
                        <InputBox label="Price" type="number" name="price"/>
                        <InputBox label="Address" type="text" name="address"/>
                        <InputBox label="City" type="text" name="city"/>
                        <InputBox label="Bedrooms" type="number" name="bedroom"/>
                        <InputBox label="Bathrooms" type="number" name="bathroom"/>
                        <InputBox label="Total Size" type="number" name="size" />
                        <InputBox label="Latitude" type="text" name="latitude" />
                        <InputBox label="Longitude" type="text" name="longitude" />
                        <InputBox label="School Distance (meters)" type="number" name="school" />
                        <div className="space-y-4 lg:flex lg:justify-between lg:py-4 lg:space-y-0">
                            <SelectFilter label="Type" name="type" options={["Buy", "Rent"]} />
                            <SelectFilter label="Property" name="property" options={["Apartment", "House", "Land"]} />
                        </div>
                        <div className="space-y-4 lg:flex lg:justify-between lg:py-4 lg:space-y-0">
                            <SelectFilter label="Furnished" name="furnished" options={["Yes", "No"]} />
                            <SelectFilter label="Pets" name="pet" options={["Allowed", "Not Allowed"]} />
                        </div>
                        <InputBox label="Hospital Distance (meters)" type="number" name="hospital" />
                        <InputBox label="Restaurant Distance (meters)" type="number" name="restaurant" /> 
                        <div className="lg:col-span-3">
                            <div className="py-6 lg:py-10 text-white space-y-2">
                                <div className="text-xl lg:text-2xl">
                                    Write a description
                                </div>
                                <ReactQuill theme="snow" name="description" onChange={setValue} value={value} />
                            </div>
                            <div className="max-w-40 mx-auto pb-10 lg:pb-20">
                                <Button label="Submit" />
                            </div>
                        </div>
                    </form>               
                </div>
                <div className="lg:col-span-1 flex flex-col py-8 lg:py-14"> 
                    {images.map((image, index) => (
                        <div key={index} className="relative hover:cursor-pointer flex space-x-3 px-6 lg:px-24 py-4">
                            <img src={image} className="w-full lg:w-80 h-auto lg:h-45 rounded-lg" alt={`Uploaded ${index}`} />
                            <div onClick={() => handleDeleteImage(image)} className="absolute top-2 right-2">
                                <XMark />
                            </div>
                        </div>    
                    ))}
                    <div className="flex justify-center pt-8 lg:pt-36"> 
                        <UploadWidget
                            uwConfig={{
                                cloudName: "dwos6fgt6",
                                uploadPreset: "estate",
                                multiple: true,
                                folder: "posts",
                            }}
                            setState={setImages}
                        />      
                    </div>    
                </div>
           </div>
           <Footer />
       </div>
    );
}

function XMark(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" strokeWidth={1.5} stroke="red" className="w-4 h-4 lg:w-6 lg:h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
}