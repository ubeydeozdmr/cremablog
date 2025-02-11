import { type ReactElement, type ReactNode } from 'react';

interface SubheadingProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export default function Subheading({
  children,
  className = '',
  ...props
}: SubheadingProps): ReactElement {
  return (
    <h2 className={`text-2xl font-semibold mt-5 ${className}`} {...props}>
      {children}
    </h2>
  );
}
