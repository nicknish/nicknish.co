import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

const HeaderLink = ({ to, children, href }) => {
  if (href) {
    return (
      <a
        href={href}
        className="header-navlink"
        target="_blank"
        rel="noopener noreferrer"
      >
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

const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        resume_url
      }
    }
  }
`;

const Header = () => (
  <StaticQuery
    query={query}
    render={data => (
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
            {/* <li>
              <HeaderLink to="/contact">Contact</HeaderLink>
            </li> */}
            <li>
              <HeaderLink to="/blog">Blog</HeaderLink>
            </li>
            <li>
              <HeaderLink href={data.site.siteMetadata.resume_url}>
                Resume
              </HeaderLink>
            </li>
          </ul>
        </nav>
      </header>
    )}
  />
);

export default Header;
