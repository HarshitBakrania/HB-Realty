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
    const[submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        setSubmitting(true);
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
            console.log(error.response?.data);
        } finally {
            setSubmitting(false);
        }
    }

    const handleDeleteImage = (url) => {
        setImages((prev) => prev.filter((image) => image !== url));
    }
 
    return (
       <div className="bg-background-color min-h-screen flex flex-col">
           <NavBar />
           <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3">
                {/* ── Form ── */}
                <div className="lg:col-span-2 lg:border-r lg:border-slate-600">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white px-5 sm:px-10 lg:px-20 xl:px-36 pt-8 lg:pt-16">
                        Create a New Listing
                    </div>
                    <form onSubmit={handleSubmit} className="text-white px-5 sm:px-10 lg:px-20 xl:px-36 pt-6 lg:pt-10 pb-10 space-y-5">

                        {/* 2-col grid for fields at sm+ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                            <InputBox label="Title" type="text" name="title" />
                            <InputBox label="Price ($)" type="number" name="price" />
                            <InputBox label="Address" type="text" name="address" />
                            <InputBox label="City" type="text" name="city" />
                            <InputBox label="Bedrooms" type="number" name="bedroom" />
                            <InputBox label="Bathrooms" type="number" name="bathroom" />
                            <InputBox label="Total Size (sq ft)" type="number" name="size" />
                            <InputBox label="Latitude" type="text" name="latitude" />
                            <InputBox label="Longitude" type="text" name="longitude" />
                            <InputBox label="School Distance (m)" type="number" name="school" />
                            <InputBox label="Hospital Distance (m)" type="number" name="hospital" />
                            <InputBox label="Restaurant Distance (m)" type="number" name="restaurant" />
                        </div>

                        {/* Select filters — 2 col at all sizes */}
                        <div className="grid grid-cols-2 gap-4">
                            <SelectFilter label="Type" name="type" options={["Buy", "Rent"]} />
                            <SelectFilter label="Property" name="property" options={["Apartment", "House", "Land"]} />
                            <SelectFilter label="Furnished" name="furnished" options={["Yes", "No"]} />
                            <SelectFilter label="Pets" name="pet" options={["Allowed", "Not Allowed"]} />
                        </div>

                        {/* Description */}
                        <div className="space-y-2 pt-2">
                            <div className="text-lg sm:text-xl">Write a description</div>
                            <ReactQuill theme="snow" name="description" onChange={setValue} value={value} />
                        </div>

                        <div className="pt-2">
                            <Button type="submit" label={submitting ? "Submitting…" : "Submit Listing"} className="w-full sm:max-w-xs" />
                        </div>
                    </form>
                </div>

                {/* ── Image Upload Panel ── */}
                <div className="lg:col-span-1 border-t border-slate-700 lg:border-t-0 px-5 sm:px-10 lg:px-8 py-8">
                    <div className="text-white text-lg font-semibold mb-4">Uploaded Images</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                        {images.map((image, index) => (
                            <div key={index} className="relative group rounded-lg overflow-hidden">
                                <img
                                    src={image}
                                    className="w-full h-36 sm:h-40 lg:h-44 object-cover rounded-lg"
                                    alt={`Uploaded ${index}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteImage(image)}
                                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1 transition-colors"
                                >
                                    <XMark />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-center lg:justify-start">
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
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
}