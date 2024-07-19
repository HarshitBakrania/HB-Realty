export const SelectFilter = ({ label, name, options }) => {
    return (
        <div className="flex flex-col max-w-max">
            <label>{label}</label>
            <select name={name} className="text-black">
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};