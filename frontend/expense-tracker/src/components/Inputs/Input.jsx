import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent border border-gray-300 rounded-md py-2 px-4 pr-10 outline-none focus:border-primary"
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-primary"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-slate-400"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
