import { useEffect, useRef, useState } from 'react';
import useOnScreen from '../../../utils/hooks/useOnScreen';
import useScript from '../../../utils/hooks/useScript';
import {
  COMMENTS_URL,
  SCRIPT_ATTRIBUTES,
  COMMENTS_SELECTOR
} from './constants';

const useCommento = ({ loaded, scriptLoaded, setLoaded }) => {
  useEffect(() => {
    if (scriptLoaded && !loaded && !document.querySelector(COMMENTS_SELECTOR)) {
      try {
        window.commento.main();
        setLoaded(true);
      } catch (e) {
        console.error('Error loading Commento', e);
      }
    }
  }, [loaded, scriptLoaded]);
};

const useComments = () => {
  const [loaded, setLoaded] = useState(false);

  // Create ref for useOnScreen hook to detect if user has seen element
  const containerRef = useRef();

  // Detect whether comments element is seen
  const isOnScreen = useOnScreen(containerRef, '10px');

  // Load script when comments element is seen
  const [scriptLoaded, scriptHasError] = useScript(
    COMMENTS_URL,
    SCRIPT_ATTRIBUTES,
    isOnScreen,
    false
  );

  // Load comments when script is loaded
  useCommento({ loaded, scriptLoaded, setLoaded });

  return { containerRef, loaded, isOnScreen, scriptHasError };
};

export default useComments;
