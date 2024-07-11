export default function Button({label}){
    return(
        <div className="pt-6">
            <button class="bg-white w-full text-black py-2 px-4 rounded">
                {label}
            </button>
        </div>
    )
}