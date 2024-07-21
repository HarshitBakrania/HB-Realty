export default function Button({label, onClick, className, children}){
    return(
        <div>
            <button 
                onClick={onClick} 
                className={`bg-white w-full text-black py-2 px-4 rounded flex items-center justify-center ${className}`}
            >
                {children}
                <span className="ml-2">{label}</span>
            </button>
        </div>
    )
}