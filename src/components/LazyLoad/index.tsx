/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import Lazy from 'lazy-child';

interface RenderFuncWithRef {
  (ref: React.Ref<any>): React.ReactNode;
}

interface LazyLoadProps {
  children?: ReactElement | ReactElement[];
  enabled?: boolean;
  offsetTop?: number;
  offsetBottom?: number;
  offsetLeft?: number;
  offsetRight?: number;
  throttle?: number;
  renderPlaceholder?: RenderFuncWithRef;
}

/* Ignore unit testing for this function since the logic
* to invoke it is deferred to the 'lazy-child' component */
// istanbul ignore next
const defaultRenderPlaceholder = (
  ref: React.Ref<any>,
  // eslint-disable-next-line arrow-body-style
): ReactElement => {
  // istanbul ignore next
  return <div ref={ref} />;
};

/**
  * @constructor
  * @param {object} children - Child components that will be lazy-loaded (if enabled)
  * @param {boolean} enabled - Whether or not the lazy-loading functionality should be active
  * @param {number} offsetTop - Number of pixels to add to the top of the area checked
  *   against when computing in view elements.
  * @param {number} offsetBottom - Number of pixels to add to the bottom of the area checked
  *   against when computing in view elements.
  * @param {number} offsetLeft - Number of pixels to add to the left of the area checked
  *   against when computing in view elements.
  * @param {number} offsetRight - Number of pixels to add to the right of the area checked
  *   against when computing in view elements.
  * @param {function} renderPlaceholder - Function that renders a JSX element that will serve
  *   as a placeholder displaying before the lazy-loaded child components have rendered.
*/
const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  enabled = false,
  offsetTop = 300,
  offsetBottom = 300,
  offsetLeft = 0,
  offsetRight = 0,
  throttle = 100,
  renderPlaceholder,
}): ReactElement => (
  !enabled || typeof window === 'undefined' ? <>{ children }</> : (
    <Lazy
      offsetTop={offsetTop}
      offsetBottom={offsetBottom}
      offsetLeft={offsetLeft}
      offsetRight={offsetRight}
      throttle={throttle}
      renderPlaceholder={(
        renderPlaceholder && typeof renderPlaceholder === 'function'
          ? renderPlaceholder : defaultRenderPlaceholder
      )}
    >
      <>{ children }</>
    </Lazy>
  )
);

LazyLoad.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  enabled: PropTypes.bool,
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  throttle: PropTypes.number,
  renderPlaceholder: PropTypes.func,
};

export default LazyLoad;
