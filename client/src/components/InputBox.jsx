export function InputBox({ label, placeholder, type, onChange, name, className, value, defaultValue }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-white/60 tracking-wide">
          {label}
        </label>
      )}
      <input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        defaultValue={defaultValue}
        className={`
          bg-white/5 border border-white/10 text-white placeholder:text-white/25
          px-3 py-2.5 rounded-lg w-full text-sm
          focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-white/25
          hover:border-white/20
          transition-all duration-150
          ${className ?? ""}
        `}
      />
    </div>
  );
}