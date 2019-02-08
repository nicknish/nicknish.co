import '../scss/index.scss';

import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, location }) => (
  <div className="site-container">
    <Header />
    <main className="site-content">{children}</main>
    <Footer />
  </div>
);

export default Layout;
