export const SelectFilter = ({ label, name, options, className, onChange, value }) => {
    return (
        <div className="flex flex-col">
            <label className="mb-1">{label}</label>
            <select 
                name={name} 
                className={`text-black rounded-md ${className}`}
                onChange={onChange}
                value={value}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};