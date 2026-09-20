import { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { InputBox } from "../components/InputBox";
import { SelectFilter } from "../components/SelectFilter";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export const Homepage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bg-background-color min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-10 md:px-12 md:py-16 lg:px-20 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 items-center">
          <div className="space-y-10 md:space-y-12">
            <div>
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Find Your <br className="hidden lg:block" /> Dream Home
              </h1>
              <p className="text-gray-400 text-base md:text-lg lg:text-xl mt-5 leading-relaxed max-w-lg">
                Discover the perfect property for you with our comprehensive
                real estate services.
              </p>
            </div>
            <div className="block lg:hidden">
              <img
                className="rounded-2xl w-full h-64 sm:h-80 object-cover"
                src="https://photos.zillowstatic.com/fp/566829ef38b8818eca4e21005f205e8c-cc_ft_960.jpg"
                alt="Dream Home"
              />
            </div>
            <div>
              <SearchFilters />
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
              <div>
                <div className="text-white text-3xl md:text-4xl font-bold">500+</div>
                <div className="text-gray-400 text-sm md:text-base mt-1">Properties Sold</div>
              </div>
              <div>
                <div className="text-white text-3xl md:text-4xl font-bold">$1B+</div>
                <div className="text-gray-400 text-sm md:text-base mt-1">Total Sales</div>
              </div>
              <div>
                <div className="text-white text-3xl md:text-4xl font-bold">15+</div>
                <div className="text-gray-400 text-sm md:text-base mt-1">Years in Business</div>
              </div>
              <div>
                <div className="text-white text-3xl md:text-4xl font-bold">98%</div>
                <div className="text-gray-400 text-sm md:text-base mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block h-full">
            <img
              className="rounded-3xl w-full h-full min-h-[600px] object-cover"
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
    <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl">
      <div className="text-white text-xl font-semibold mb-6">
        Search Properties
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-white">
        <InputBox
          onChange={(e) => {
            setCity(e.target.value);
          }}
          label="City"
          placeholder="Enter a City"
          type="text"
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
          className="w-full text-slate-500 rounded-lg p-2.5"
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
      </div>
      <Button
        label="Search"
        onClick={GetProperties}
        className="mt-8 w-full py-3 text-lg font-medium"
      />
    </div>
  );
}
