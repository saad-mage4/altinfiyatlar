import React, { useState } from "react";
import TextInput from "../TextInput";
import { primeIcons } from "@/utils/primeIcons";

// const IconPicker = () => {
//     const [isPickerOpen, setIsPickerOpen] = useState(false); // State to handle picker visibility
//     const [selectedIcon, setSelectedIcon] = useState(""); // State to store the selected icon
//     const pickerRef = useRef(null); // Reference to icon picker container

//     // Handle opening/closing of the picker
//     const handlePickerOpen = () => {
//         setIsPickerOpen(!isPickerOpen);
//     };

//     // Handle icon selection
//     const handleIconSelect = (icon) => {
//         setSelectedIcon(icon.name); // Set selected icon
//         setIsPickerOpen(false); // Close picker
//     };

//     // Close the icon picker when clicking outside of it
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 pickerRef.current &&
//                 !pickerRef.current.contains(event.target)
//             ) {
//                 setIsPickerOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [pickerRef]);

//     return (
//         <div className="icon-picker relative" ref={pickerRef}>
//             {/* Input field that triggers the picker */}
//             <TextInput
//                 id="icon"
//                 type="text"
//                 name="icon"
//                 value={selectedIcon}
//                 onClick={handlePickerOpen} // Open the icon picker when clicked
//                 readOnly
//                 placeholder="Select an icon"
//                 className="block w-full text-sm text-gray-500 border-gray-300 rounded cursor-pointer"
//             />

//             {/* Icon picker modal */}
//             {isPickerOpen && (
//                 <div className="absolute bg-white border rounded shadow-lg p-4 mt-2 z-10 w-full h-30 overflow-y-auto">
//                     <div className="grid grid-cols-3 gap-4">
//                         {primeIcons?.map((icon) => (
//                             <div
//                                 key={icon.name}
//                                 onClick={() => handleIconSelect(icon)} // Handle icon selection
//                                 className="flex justify-center items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
//                             >
//                                 <i
//                                     className={icon?.className}
//                                     style={{ fontSize: "24px" }}
//                                 ></i>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default IconPicker;

const IconPicker = ({
    value = "",
    onChange,
    placeholder = "Select an icon",
}) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handlePickerOpen = () => {
        setIsPickerOpen(true);
    };

    const handleIconSelect = (icon) => {
        onChange(icon?.name);
        setIsPickerOpen(false);
    };

    return (
        <div className="icon-picker relative">
            <TextInput
                type="text"
                value={value}
                onClick={handlePickerOpen}
                readOnly
                placeholder={placeholder}
                className="block w-full text-sm text-gray-500 border-gray-300 rounded"
            />

            {/* Icon picker modal */}
            {isPickerOpen && (
                <div className="absolute bg-white border rounded shadow-lg p-4 mt-2 z-10">
                    <div className="grid grid-cols-3 gap-4">
                        {primeIcons?.map((icon) => (
                            <div
                                key={icon?.name}
                                onClick={() => handleIconSelect(icon)}
                                className="flex justify-center items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                            >
                                <i
                                    className={icon?.className}
                                    style={{ fontSize: "24px" }}
                                ></i>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IconPicker;
