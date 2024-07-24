export default function Button({label, onClick, className, children, id}) {
    return (
        <div>
            <button 
                onClick={onClick} 
                className={`bg-white text-black py-2 px-4 rounded flex items-center justify-center ${className}`}
                id={id}
            >
                {children && <div>{children}</div>}
                <span className={`${children ? 'pl-2' : null}`}>{label}</span>
            </button>
        </div>
    )
}