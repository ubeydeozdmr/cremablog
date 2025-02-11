// import { useEffect, useRef } from 'react';

// export default function useClickOutside(handler: () => void) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         handler();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [handler]);

//   return ref;
// }

import { type RefObject, useEffect, useRef } from 'react';

export default function useClickOutside(
  handler: () => void,
  excludeRef?: RefObject<HTMLElement | HTMLButtonElement | null>,
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (!excludeRef ||
          !excludeRef.current ||
          !excludeRef.current.contains(event.target as Node))
      ) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handler, excludeRef]);

  return ref;
}
