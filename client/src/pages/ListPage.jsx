import { InputBox } from "../components/InputBox";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import PropertyCard from "../components/PropertyCard";
import { SelectFilter } from "../components/SelectFilter";
import { Map } from "../components/Map";
import { usePosts } from "../hooks/usePosts";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

export const ListPage = () => {
    const { posts, loading } = usePosts();
    const [city, setCity] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [type, setType] = useState("Any");
    const [property, setProperty] = useState("Any");
    const [bedroom, setBedroom] = useState(0);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const navigate = useNavigate();

    if (loading) {
        return <div className="bg-background-color min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
    }

    const capitalizeWords = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (city) params.append("city", capitalizeWords(city));
        if (type && type !== "Any") params.append("type", type.toLowerCase());
        if (property && property !== "Any") params.append("property", property.toLowerCase());
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (bedroom && bedroom !== 0) params.append("bedroom", bedroom);
        navigate(`/list?${params.toString()}`);
        setFiltersOpen(false);
    };

    const FilterPanel = () => (
        <div className="space-y-5 text-white">
            <div className="text-xl font-semibold border-b border-slate-600 pb-3">Filters</div>
            <InputBox
                onChange={e => setCity(e.target.value)}
                label="Location"
                placeholder="City Location"
                type="text"
            />
            <div className="grid grid-cols-2 gap-4">
                <SelectFilter
                    onChange={e => setType(e.target.value)}
                    value={type}
                    label="Type"
                    name="type"
                    options={["Any", "Buy", "Rent"]}
                    className="p-2 w-full"
                />
                <SelectFilter
                    onChange={e => setProperty(e.target.value)}
                    value={property}
                    label="Property"
                    name="property"
                    options={["Any", "Apartment", "House", "Land"]}
                    className="p-2 w-full"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputBox
                    onChange={e => setMinPrice(e.target.value)}
                    label="Min Price"
                    placeholder="0"
                    type="number"
                />
                <InputBox
                    onChange={e => setMaxPrice(e.target.value)}
                    label="Max Price"
                    placeholder="1,000,000"
                    type="number"
                />
            </div>
            <InputBox
                onChange={e => setBedroom(e.target.value)}
                label="Bedrooms"
                name="bedroom"
                placeholder="Number of Bedrooms"
                type="number"
            />
            <Button label="Search" onClick={handleFilter} className="w-full" />
        </div>
    );

    return (
        <div className="bg-background-color min-h-screen flex flex-col">
            <NavBar />

            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-6">

                {/* Mobile: Filter Toggle Button */}
                <div className="lg:hidden px-4 pt-4">
                    <button
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="flex items-center gap-2 bg-secondary-color text-white px-4 py-2 rounded-lg w-full justify-between border border-slate-600"
                    >
                        <span className="font-semibold">Filters</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Mobile: Collapsible Filter Panel */}
                    {filtersOpen && (
                        <div className="bg-secondary-color border border-slate-600 rounded-lg p-4 mt-2">
                            <FilterPanel />
                        </div>
                    )}
                </div>

                {/* Desktop Sidebar Filters */}
                <div className="hidden lg:block px-6 py-6 col-span-1 border-r border-slate-600">
                    <FilterPanel />
                </div>

                {/* Property Cards */}
                <div className="lg:col-span-3 text-white space-y-5 p-4 sm:p-6 lg:p-8 lg:border-r lg:border-slate-600">
                    {posts.length === 0 ? (
                        <div className="text-center text-slate-400 pt-20 text-lg">No properties found.</div>
                    ) : (
                        posts.map(item => (
                            <PropertyCard key={item.id} item={item} />
                        ))
                    )}
                </div>

                {/* Map */}
                <div className="lg:col-span-2 text-white p-4 lg:p-6">
                    <div className="h-64 sm:h-80 md:h-96 lg:h-[calc(100vh-64px)] sticky top-16 rounded-xl overflow-hidden">
                        <Map items={posts} />
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};
