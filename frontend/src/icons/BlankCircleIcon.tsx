import { type ReactElement } from 'react';

export default function BlankCircleIcon(): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-6 unchecked-icon text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2.25a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
      />
    </svg>
  );
}
