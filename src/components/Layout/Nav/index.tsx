import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Link, { GatsbyLinkProps } from 'gatsby-link';

import { HOME_URL, WORK_URL, START_HERE_URL } from '../../../constants/urls';
import { isBrowser } from '../../../utils/helpers';
import * as styles from './Nav.module.css';

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
      <Link to={HOME_URL} className={styles.logo}>
        nicknish
      </Link>
      <div className={styles.navSide}>
        <NavLink to={START_HERE_URL}>Start Here</NavLink>
        <NavLink
          to={HOME_URL} // This isn't a bug, the Homepage is the blog
          isCurrent={isBlog || isBlogSeries}
        >
          Blog
        </NavLink>
        <NavLink to={WORK_URL} isCurrent={isWork || isProject}>
          Work
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
