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
    <div className="bg-background-color max-w-full">
      <NavBar />
      <div className="px-10 py-12 md:px-20 md:py-16 lg:px-36 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:gap-x-14">
          <div className="space-y-8 md:space-y-12 lg:space-y-20">
            <div>
              <div className="text-white text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Find Your Dream Home
              </div>
              <div className="text-white text-base md:text-xl lg:text-2xl mt-5">
                Discover the perfect property for you with our comprehensive
                real estate services.
              </div>
            </div>
            <div className="block lg:hidden">
              <img
                className="rounded-md"
                src="https://photos.zillowstatic.com/fp/566829ef38b8818eca4e21005f205e8c-cc_ft_960.jpg"
                alt="Dream Home"
              />
            </div>
            <div>
              <SearchFilters />
            </div>
            <div className="text-white grid grid-cols-2 font-bold tracking-tighter text-xl md:text-2xl lg:text-3xl py-5 px-5 gap-16">
              <div>500+ Properties Sold</div>
              <div>$1B+ Sales</div>
              <div>15+ Years in Business</div>
              <div className="">98% Customer Satisfaction</div>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              className="rounded-md"
              src="https://photos.zillowstatic.com/fp/566829ef38b8818eca4e21005f205e8c-cc_ft_960.jpg"
              alt="Dream Home"
            />
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

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const GetProperties = async () => {
    try {
      const params = new URLSearchParams();
      if (city) params.append("city", capitalizeWords(city));
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (type && type !== "Any") params.append("type", type.toLowerCase());
      navigate(`/list?${params.toString()}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-secondary-color p-5 rounded-lg mt-12">
      <div className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mb-4 italic">
        Your perfect property awaits!
      </div>
      <div className="rounded-lg text-white">
        <div className="grid grid-cols-2 gap-5">
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
            className="w-full space-y-4 p-2.5 text-slate-500 rounded-xl"
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