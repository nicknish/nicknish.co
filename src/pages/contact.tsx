import React from 'react';
import Contact from '../components/Contact/container';
import Layout from '../components/Layout/Layout';
import { SEOTypes } from '../components/Layout/SEO';

const ContactPage = () => {
  return (
    <Layout type={SEOTypes.page} content={{ title: 'Contact' }} path="/contact">
      <Contact />
    </Layout>
  );
};

export default ContactPage;
