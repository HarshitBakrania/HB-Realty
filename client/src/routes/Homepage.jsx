
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
                    <SearchBar />
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

function SearchBar(){
    return (
    <form className="max-w-md">   
        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for properties ..." required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>
    )
}