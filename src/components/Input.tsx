import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string; // Explicitly requiring name for autocomplete/id generation
    isRequired?: boolean;
}

export default function Input({
    label,
    name,
    isRequired = false,
    ...props
}: Props) {
    // Generate an ID for label tracking if one isn't passed down
    const inputId = props.id || `input-${name}`;

    return (
        <div className="space-y-2">
            <label htmlFor={inputId} className="font-medium block text-gray-700">
                {label}
                {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
                {...props}
                name={name}
                id={inputId}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all border-gray-300"
            />
        </div>
    );
}