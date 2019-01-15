import React from 'react';
import { Link } from 'gatsby';

const HeaderLink = ({ to, children, href }) => {
  if (href) {
    return (
      <a href={href} className="header-navlink" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className="header-navlink" activeClassName="active">
      {children}
    </Link>
  );
};

const Header = () => (
  <header className="header container">
    <Link to="/" className="header-logo">
      NN
    </Link>
    <nav className="header-nav">
      <ul className="header-navlinks">
        <li>
          <HeaderLink to="/work">Work</HeaderLink>
        </li>
        <li>
          <HeaderLink to="/projects">Projects</HeaderLink>
        </li>
        <li>
          <HeaderLink to="/contact">Contact</HeaderLink>
        </li>
        <li>
          <HeaderLink to="/blog">Blog</HeaderLink>
        </li>
        <li>
          <HeaderLink href="https://s3-us-west-1.amazonaws.com/nicknish-experiments/resume/nick_nish_resume.pdf">
            Resume
          </HeaderLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
