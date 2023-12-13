"use client";
import React from "react";
import Select from "react-select";
interface IPersonSelectorProps {
  label: string;
  value: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}
const PersonSelector: React.FC<IPersonSelectorProps> = ({
  label,
  disabled,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6">{label}</label>
      <div className="mt-2">
        <Select
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};

export default PersonSelector;
