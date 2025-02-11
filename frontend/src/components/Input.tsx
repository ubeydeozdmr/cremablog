import {
  type InputHTMLAttributes,
  type ReactElement,
  type TextareaHTMLAttributes,
} from 'react';

type FormInputProps = {
  name: string;
  type?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  className?: string;
  extended?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function FormInput({
  name,
  type = 'text',
  defaultValue,
  placeholder = name.charAt(0).toUpperCase() + name.slice(1),
  className,
  extended = false,
  ...props
}: FormInputProps): ReactElement {
  if (extended) {
    return (
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`rounded-md p-3 bg-orange-100 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-50 ${className}`}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`rounded-md p-3 bg-orange-100 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-50 ${className}`}
      {...props}
    />
  );
}
