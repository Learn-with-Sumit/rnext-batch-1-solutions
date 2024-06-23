// Reusable button component with customization options
export default function Button({ bg, children, ...extraAttr }) {
    return (
        <>
            <button
                {...extraAttr} // Spread additional attributes for flexibility
                className={`rounded-md ${bg} px-3.5 py-2.5 text-sm font-semibold disabled:bg-gray-500`} // Apply base styles and disabled state styling
            >
                {children}
            </button>
        </>
    );
}
