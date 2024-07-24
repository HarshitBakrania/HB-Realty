export function InputBox({label, placeholder, type, onChange, name, className}){
    return(
        <div className="flex flex-col">
            <label className="mb-1">{label}</label>
            <input 
                onChange={onChange} 
                type={type} 
                placeholder={placeholder} 
                name={name} 
                className={`text-slate-500 p-2.5 rounded-lg w-full ${className}`} 
            />
        </div>
    )
}