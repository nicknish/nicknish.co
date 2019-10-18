import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Link, { GatsbyLinkProps } from 'gatsby-link';

import { HOME_URL, WORK_URL } from '../../constants/urls';
import { isBrowser } from '../../utils/helpers';
import styles from './Nav.module.css';

interface INavLinkProps extends GatsbyLinkProps<{}> {
  isCurrent?: boolean;
}

const NavLink: React.FC<INavLinkProps> = ({ to, isCurrent, children }) => {
  return (
    <Link
      to={to}
      className={cx(styles.navItem, { [styles.active]: isCurrent })}
      activeClassName={styles.active}
      data-testid={`NavLink--${to}`}
    >
      {children}
    </Link>
  );
};

const Nav: React.FC = () => {
  const [location, setLocation] = useState(
    isBrowser() ? window.location.pathname : null
  );

  useEffect(() => {
    setLocation(window.location.pathname);
  }, []);

  const isBlog = location ? location.indexOf('/blog/') > -1 : false;
  const isBlogSeries = location ? location.indexOf('/series/') > -1 : false;
  const isWork = location ? location.indexOf('/work/') > -1 : false;
  const isProject = location ? location.indexOf('/projects/') > -1 : false;

  return (
    <nav className={styles.nav}>
      <NavLink
        to={HOME_URL} // This isn't a bug, the Homepage is the blog
        isCurrent={isBlog || isBlogSeries}
      >
        Blog
      </NavLink>
      <Link to={HOME_URL} className={styles.logo}>
        nicknish
      </Link>
      <NavLink to={WORK_URL} isCurrent={isWork || isProject}>
        Work
      </NavLink>
    </nav>
  );
};

export default Nav;
