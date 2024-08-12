import { useContext } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { InputBox } from "../components/InputBox";
import { SelectFilter } from "../components/SelectFilter";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export const Homepage = () => {
  const { currentUser } = useContext(AuthContext);

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
            <div className="text-white grid grid-cols-2 font-semibold text-3xl py-16">
              <div className="space-y-14">
                <div>500+ Properties Sold</div>
                <div>98% Customer Satisfaction</div>
              </div>
              <div className="space-y-14 pl-20">
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
      <Footer />
    </div>
  );
};

function SearchFilters() {
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const GetProperties = async () => {
    try {
      const params = new URLSearchParams();
      if (city) params.append("city", city.toLowerCase());
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (type && type !== "Any") params.append("type", type.toLowerCase());
      navigate(`/list?${params.toString()}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-secondary-color p-10 rounded-lg">
      <div className="text-white text-3xl font-medium mb-4 italic">
        Your perfect property awaits!
      </div>
      <div className="p-4 rounded-lg text-white">
        <div className="grid grid-cols-4 gap-4">
          <InputBox
            onChange={(e) => {
              setCity(e.target.value);
            }}
            label="City"
            placeholder="Enter a City"
            type="text"
            className="w-full"
          />
          <InputBox
            onChange={(e) => {
              setMinPrice(e.target.value);
            }}
            label="Min. Price"
            placeholder="0"
            type="number"
            className="w-full"
          />
          <InputBox
            onChange={(e) => {
              setMaxPrice(e.target.value);
            }}
            label="Max. Price"
            placeholder="1,000,000"
            type="number"
            className="w-full"
          />
          <SelectFilter
            onChange={(e) => {
              setType(e.target.value);
            }}
            value={type}
            label="Buy or Rent"
            name="type"
            options={["Any", "Buy", "Rent"]}
            className="w-full space-y-4 p-2.5 text-slate-500 rounded-lg"
          />
        </div>
        <Button
          label="Search"
          onClick={GetProperties}
          className="mt-10 w-full"
        />
      </div>
    </div>
  );
}
