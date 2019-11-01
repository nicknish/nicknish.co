import '../../css/App.css';

import React from 'react';

import ErrorBoundary from './ErrorBoundary';
import SiteMetadata from './SiteMetadata';
import SEO, { SEOPropTypes } from './SEO';
import Nav from './Nav';
import Footer from '../Footer';

const Layout: React.FC<SEOPropTypes> = ({ children, ...seoProps }) => (
  <ErrorBoundary>
    <div className="site-container">
      <SiteMetadata />
      <SEO {...seoProps} />
      <Nav />
      <main className="site-content">{children}</main>
      <Footer />
    </div>
  </ErrorBoundary>
);

export default Layout;
