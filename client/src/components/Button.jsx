export default function Button({label, onClick}){
    return(
        <div className="pt-6">
            <button onClick={onClick} className="bg-white w-full text-black py-2 px-4 rounded">
                {label}
            </button>
        </div>
    )
}