import { useEffect } from 'react';

export default function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | CremaBlog`;

    return () => {
      document.title = 'CremaBlog';
    };
  }, [title]);
}
