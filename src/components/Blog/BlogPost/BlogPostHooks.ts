import { useEffect, RefObject } from 'react';
import mediumZoom from 'medium-zoom';
import { prefersDarkMode } from '../../../utils/helpers';

export const useMediumZoom = (postBodyRef: RefObject<HTMLDivElement>) => {
  let zoom;

  useEffect(() => {
    if (postBodyRef) {
      const $postBody = postBodyRef.current as HTMLDivElement;
      const $images = $postBody ? $postBody.querySelectorAll('img') : [];

      if ($images.length) {
        zoom = mediumZoom($images, {
          background: prefersDarkMode()
            ? 'rgba(0, 0, 0, .9)'
            : 'rgba(255,255,255, .83)',
          scrollOffset: 10
        });
      }
    }

    return () => {
      if (zoom) {
        const $overlays = document.querySelectorAll('.medium-zoom-overlay');
        const $openImages = document.querySelectorAll(
          '.medium-zoom-image--opened'
        );

        $overlays.forEach($node => $node.remove());
        $openImages.forEach($node => $node.remove());

        zoom.detach();
      }
    };
  }, [postBodyRef]);
};
