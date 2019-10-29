import React from 'react';

import Layout from '../components/Layout/Layout';
import { SEOTypes } from '../components/Layout/SEO';
import NotFound from '../components/NotFound';

const NotFoundPage: React.FC = () => (
  <Layout
    type={SEOTypes.page}
    content={{ title: 'Not Found' }}
    path="/not-found"
  >
    <NotFound />
  </Layout>
);

export default NotFoundPage;
