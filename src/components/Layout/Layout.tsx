import '../css/App.css';

import React from 'react';

import SiteMetadata from '../SiteMetadata';
import SEO, { SEOPropTypes } from '../SEO';
import Nav from '../Nav';
import Footer from '../Footer';

const Layout: React.FC<SEOPropTypes> = ({ children, ...seoProps }) => (
  <div className="site-container">
    <SiteMetadata />
    <SEO {...seoProps} />
    <Nav />
    <main className="site-content">{children}</main>
    <Footer />
  </div>
);

export default Layout;
