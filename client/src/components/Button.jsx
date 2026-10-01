export default function Button({ label, onClick, className, children, id, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      id={id}
      className={`
        inline-flex items-center justify-center gap-2
        bg-white text-black font-medium text-sm
        py-2 px-4 rounded-lg
        hover:bg-gray-100 active:scale-95
        transition-all duration-150
        whitespace-nowrap cursor-pointer
        ${className ?? ""}
      `}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}