"use client";

import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

interface SelectProps {
    value?: Record<string, any>;
    // eslint-disable-next-line no-unused-vars
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[];
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, disabled }) => {
    const animatedComponents = makeAnimated();

    return (
        <div className="z-[100]">
            <div className="max-w-md">
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    components={animatedComponents}
                    isMulti
                    options={options}
                    classNames={{
                        input: () => "bg-white text-black dark:bg-black dark:text-white",
                        container: () => "border-black border-2 dark:bg-black dark:text-white rounded-md",
                        control: () => "text-sm px-2",
                        indicatorsContainer: () => "dark:bg-black dark:text-white rounded-md cursor-pointer",
                        menuList: () => "bg-white dark:bg-black px-2",
                        valueContainer: () => "bg-white dark:bg-black flex flex-row gap-2",
                        singleValue: () => "bg-red-600",
                        multiValue: () => "bg-sky-500 rounded-md p-1",
                        menu: () => "p-1 mt-2  bg-white boder-none bg-white dark:bg-black rounded-lg",
                        clearIndicator: () => "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800",
                        dropdownIndicator: () => "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black",
                        placeholder: () => "text-gray-500 pl-1 py-0.5"
                    }}
                    unstyled
                />
            </div>
        </div>
    );
};

export default Select;