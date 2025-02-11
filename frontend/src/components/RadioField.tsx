import { type ReactElement } from 'react';

import BlankCircleIcon from '../icons/BlankCircleIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import FormInput from './Input';

type RadioFieldProps = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
  [key: string]: any;
};

export default function RadioField({
  id,
  name,
  value,
  checked,
  onChange,
  label = value.charAt(0).toUpperCase() + value.slice(1),
  ...props
}: RadioFieldProps): ReactElement {
  return (
    <label className="flex items-center gap-2" htmlFor={id}>
      <FormInput
        type="radio"
        id={id}
        name={name}
        value={value}
        className="hidden peer"
        onChange={onChange}
        checked={checked}
        {...props}
      />
      <span className="icon" data-theme={value}>
        {checked ? <CheckCircleIcon /> : <BlankCircleIcon />}
      </span>
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        {label}
      </span>
    </label>
  );
}
