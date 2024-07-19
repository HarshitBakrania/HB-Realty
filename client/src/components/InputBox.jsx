export function InputBox({label, placeholder, type, onChange, name}){
    return(
        <div className="space-y-4">
            <div className="flex-col space-y-1">
                <label>{label}</label>
                <input onChange={onChange} type={type} placeholder={placeholder} name={name} className="w-full text-slate-500 p-2.5 rounded-lg" />
            </div>
        </div>
    )
}