import { useState, useEffect } from 'react';

/**
 * useOnScreen
 * Based off of https://usehooks.com/useOnScreen/
 */
const useOnScreen = (ref: React.RefObject<any>, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observerOptions = { rootMargin };
    const observerCallback: IntersectionObserverCallback = ([entry]) => {
      // Update our state when observer callback fires
      setIntersecting(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return isIntersecting;
};

export default useOnScreen;
