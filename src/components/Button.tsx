interface Props
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
    children,
    ...props
}: Props) {
    return (
        <button
            {...props}
            className="w-full bg-slate-900 hover:bg-slate-800 cursor-pointer text-white rounded-lg py-3 disabled:bg-gray-400"
        >
            {children}
        </button>
    );
}