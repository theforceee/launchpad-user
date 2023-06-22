import { MutableRefObject, useEffect, useRef, useState } from "react";

/**
 * @see https://dev.to/anxiny/easy-lazy-loading-with-react-intersection-observer-api-1dll
 */
export function useIntersection(
  ref: MutableRefObject<Element | null>,
  options: IntersectionObserverInit = {},
  forward = true
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef<null | IntersectionObserver>(null);

  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    if (!ref.current) return;
    cleanOb();

    const obs = (observer.current = new IntersectionObserver(([entry]) => {
      const isElementIntersecting = entry.isIntersecting;

      if (!forward) {
        setIsIntersecting(isElementIntersecting);
        return;
      }

      if (forward && !isIntersecting && isElementIntersecting) {
        setIsIntersecting(isElementIntersecting);
        cleanOb();
      }
    }, options));

    obs.observe(ref.current);

    return () => {
      cleanOb();
    };
  }, [ref.current, options]);

  return isIntersecting;
}
