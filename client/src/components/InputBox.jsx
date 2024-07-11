export function InputBox({label, placeholder, type}){
    return(
        <div className="space-y-4">
            <div className="flex-col space-y-1">
                <label>{label}</label>
                <input type={type} placeholder={placeholder} className="w-full text-slate-500 p-2.5 rounded-lg" />
            </div>
        </div>
    )
}