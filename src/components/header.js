import React from 'react'
import Link from 'gatsby-link'

const HeaderLink = ({ to, children }) => (
  <Link to={to} className="header-navlink" activeClassName="active">
    {children}
  </Link>
)

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
          <HeaderLink to="/blog">Blog</HeaderLink>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
