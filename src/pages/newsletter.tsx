import React from 'react';
import Layout from '../components/Layout/Layout';
import NewsletterSignupPage from '../components/NewsletterSignup/Page';
import { SEOTypes } from '../components/Layout/SEO';

const NewsletterPage = () => {
  return (
    <Layout
      type={SEOTypes.page}
      content={{ title: 'Newsletter' }}
      path="/newsletter"
    >
      <NewsletterSignupPage />
    </Layout>
  );
};

export default NewsletterPage;
