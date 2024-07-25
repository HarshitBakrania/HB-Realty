import { useContext } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { InputBox } from "../components/InputBox";
import { SelectFilter } from "../components/SelectFilter";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  const navigate = useNavigate();
  const[city, setCity] = useState("");
  const[minPrice, setMinPrice] = useState("");
  const[maxPrice, setMaxPrice] = useState("");
  const[type, setType] = useState("");

  const GetProperties = async() =>{
    try{
      const response = await axios.get("http://localhost:3000/api/posts",{
        params:{
          city,
          minPrice,
          maxPrice,
          type
        }
      }
       
      )
      navigate("/list")
    }catch(error){
      console.log(error)
    }
  }

  function SearchFilters() {
    return (
      <div className="bg-secondary-color p-10 rounded-lg">
        <div className="text-white text-3xl font-medium mb-4 italic">
          Your perfect property awaits!
        </div>
        <div className="p-4 rounded-lg text-white">
          <div className="grid grid-cols-4 gap-4">
            <InputBox onChange={e =>{
              setCity(e.target.value)
            }}
              label="City"
              placeholder="Enter a City"
              type="text"
              className="w-full"
            />
            <InputBox onChange={e =>{
              setMinPrice(e.target.value)
            }}
              label="Min. Price"
              placeholder="0"
              type="number"
              className="w-full"
            />
            <InputBox onChange={e =>{
              setMaxPrice(e.target.value)
            }}
              label="Max. Price"
              placeholder="1,000,000"
              type="number"
              className="w-full"
            />
            <SelectFilter onChange={e =>{
              setType(e.target.value)
            }}
              label="Buy or Rent"
              name="type"
              options={["Any", "Buy", "Rent"]}
              className="w-full space-y-4 p-2.5 text-slate-500 rounded-lg"
            />
          </div>
          <Button label="Search" onClick={GetProperties} className="mt-10 w-full" />
        </div>
      </div>
    );
  }
  

  return (
    <div className="bg-background-color h-screen">
      <NavBar />
      <div className="p-40">
        <div className="grid grid-cols-2">
          <div className="pr-10 pt-16 space-y-5">
            <div className="text-white text-7xl font-bold">
              Find Your Dream Home
            </div>
            <div className="text-white text-xl">
              Discover the perfect property for you with our comprehensive real
              estate services.
            </div>
            <div>
              <SearchFilters />
            </div>
            <div className="text-white grid grid-cols-2 font-semibold text-xl pt-6">
              <div className="space-y-4">
                <div>500+ Properties Sold</div>
                <div>98% Customer Satisfaction</div>
              </div>
              <div className="space-y-4">
                <div>$1B+ Sales</div>
                <div>15+ Years in Business</div>
              </div>
            </div>
          </div>
          <div>
            <img src="https://photos.zillowstatic.com/fp/566829ef38b8818eca4e21005f205e8c-cc_ft_960.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

