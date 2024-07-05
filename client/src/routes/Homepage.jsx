
export const Homepage = () => {
    return (
        <div className="p-40">
            <div className="grid grid-cols-2">
                <div className="pr-10 pt-16 space-y-5">
                    <div className="text-white text-3xl font-bold sm:text-4xl md:text-5xl">
                        Find Your Dream Home
                    </div>
                    <div className="text-white text-lg md:text-xl">
                        Discover the perfect property for you with our comprehensive real estate services.
                    </div>
                    <div className="text-white">SearchBar</div>
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
    )
}

