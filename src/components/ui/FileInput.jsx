import { useState } from "react";
import { Icon } from "@iconify/react";

export default function FileInput({ name: inputName, onChange }) {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onChange?.(e); // if an onChange function is passed from outside
        }
    };

    return (
        <label className="relative flex items-center w-full cursor-pointer">
            <input
                type="file"
                id="input-file"
                name={inputName}
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                className="hidden"
            />

            <div className="flex items-center w-full h-8 px-3 py-1 rounded-md border border-input bg-transparent font-montserrat shadow-xs border-gray-500 overflow-hidden whitespace-nowrap text-xs mt-1 font-normal">
                <span className="text-placeholder-text truncate">
                    {fileName || "Seleccione una imagen"}
                </span>

                <div className="ml-auto pl-3 flex-shrink-0">
                    <Icon
                        icon="heroicons-outline:paper-clip"
                        className="text-xl text-dark-blue"
                    />
                </div>
            </div>
        </label>
    );
}