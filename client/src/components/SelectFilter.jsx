export const SelectFilter = ({ label, name, options, className, onChange, value }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-white/60 tracking-wide">
          {label}
        </label>
      )}
      <select
        name={name}
        className={`
          bg-white/5 border border-white/10 text-white
          px-3 py-2.5 rounded-lg w-full text-sm
          focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-white/25
          hover:border-white/20
          transition-all duration-150
          ${className ?? ""}
        `}
        onChange={onChange}
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} value={option} className="bg-zinc-900 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};