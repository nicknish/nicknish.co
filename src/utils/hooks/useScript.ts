import { useState, useEffect } from 'react';
import forEach from 'lodash/forEach';

/**
 * useScript
 * Based on https://usehooks.com/useScript/
 */

type isLoaded = boolean;
type hasError = boolean;

let cachedScripts = [];

const useScript = (
  src: string,
  scriptOverrides = {},
  ready = true,
  cache = true
): [isLoaded, hasError] => {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(() => {
    // Load the script when ready (or if it's undefined load it immediately)
    if (ready || typeof ready === 'undefined') {
      // If cachedScripts array includes src that means another instance of this
      // hook already loaded this script, skip loading it.
      if (cache && cachedScripts.includes(src)) {
        setState({ loaded: true, error: false });
      } else {
        cachedScripts.push(src);

        // Create script
        let script = document.createElement('script');
        script.src = src;
        script.async = true;
        if (Object.keys(scriptOverrides).length > 0) {
          forEach(scriptOverrides, (value, property) => {
            script.setAttribute(property, value);
          });
        }

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({ loaded: true, error: false });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);
          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();

          setState({ loaded: true, error: true });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        // Add script to document body
        document.body.appendChild(script);

        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      }
    }
  }, [src, ready]);

  return [state.loaded, state.error];
};

export default useScript;
