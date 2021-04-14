import React from 'react';
import cx from 'classnames';

import * as styles from './Button.module.css';

export enum ButtonThemes {
  primary = 'primary',
}

export enum ButtonSizes {
  small = 'small',
}

interface ButtonBaseProps {
  theme: ButtonThemes;
  size: ButtonSizes;
  className: string;
  component: React.ComponentType<any>;
}

type ButtonProps = ButtonBaseProps & HTMLButtonElement & any;

const Button: React.FC<ButtonProps> = ({
  theme,
  size,
  children,
  className,
  component,
  ...props
}) => {
  const classNames = cx(styles.btn, className, {
    [styles.themePrimary]: theme === ButtonThemes.primary,
    [styles.sizeSmall]: size === ButtonSizes.small,
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
