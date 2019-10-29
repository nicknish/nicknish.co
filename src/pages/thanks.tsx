import React from 'react';

import { SEOTypes } from '../components/Layout/SEO';
import Layout from '../components/Layout/Layout';
import SuccessPage from '../components/Contact/SuccessPage';

const ContactFormSuccess: React.FC = () => (
  <Layout type={SEOTypes.page} content={{ title: 'Thanks' }} path="/thanks">
    <SuccessPage />
  </Layout>
);

export default ContactFormSuccess;
