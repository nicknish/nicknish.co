import React from 'react';
import cx from 'classnames';

const THEMES_KEYS = {
  primary: 'primary',
  unstyled: 'unstyled'
};

const THEMES = {
  [THEMES_KEYS.primary]: 'btn btn-primary',
  [THEMES_KEYS.unstyled]: 'btn'
};

const SIZE_KEYS = {
  small: 'small'
};

const SIZE = {
  [SIZE_KEYS.small]: 'btn-sm'
};

const Button = ({ theme, size, children, className, component, ...props }) => {
  const classNames = cx(className, {
    [THEMES[theme]]: theme,
    [SIZE[size]]: size
  });

  if (component) {
    const Component = component;
    return (
      <Component className={classNames} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
