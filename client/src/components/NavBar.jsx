export default function NavBar(){
    return <div className="flex justify-between p-8 bg-background-color">
        <div className="sm:pl-20 "><HomeIcon /></div>
        <div className="sm:pr-10 ">
            <div className="flex justify-end space-x-4">
                <div className="cursor-pointer text-white no-underline hover:underline">Buy</div>
                <div className="cursor-pointer text-white no-underline hover:underline">Rent</div>
                <div className="cursor-pointer text-white no-underline hover:underline">About</div>
                <div className="cursor-pointer text-white no-underline hover:underline">Contact</div>
                <div className="cursor-pointer text-white no-underline hover:underline">Sign in</div>
                <div className="cursor-pointer text-white no-underline hover:underline">Sign up</div>
            </div> 
        </div>
    </div>
}

const HomeIcon = () => {
    return <div className="cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
    </div>  
}