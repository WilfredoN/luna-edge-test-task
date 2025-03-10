import { forwardRef } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, name, type = 'text', error, placeholder, ...props }, ref) => {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full px-3 py-2 bg-gray-700 border ${
            error ? 'border-red-500' : 'border-gray-600'
          } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
