import { type ReactElement } from 'react';

type TitleProps = {
  children: string;
};

export default function Title({ children }: TitleProps): ReactElement {
  return (
    <h1 className="font-title text-4xl sm:text-6xl md:text-8xl font-bold py-5 md:py-10 tracking-tighter text-gray-900 dark:text-gray-50">
      {children}
    </h1>
  );
}
