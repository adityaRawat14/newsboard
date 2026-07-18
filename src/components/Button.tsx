interface Props
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
    children,
    ...props
}: Props) {
    return (
        <button
            {...props}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 disabled:bg-gray-400"
        >
            {children}
        </button>
    );
}