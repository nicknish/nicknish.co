import React from 'react';
import { graphql } from 'gatsby';
import Layout, { SEOTypes } from '../components/Layout/Layout';
import Start from '../components/Start';

const StartPage: React.FC<any> = ({ data }) => {
  const productPosts = data.popularPosts.popularProductPosts;
  const technicalPosts = data.popularPosts.popularTechnicalPosts;

  return (
    <Layout
      type={SEOTypes.page}
      content={{ title: 'Start Here' }}
      path="/start-here"
    >
      <Start productPosts={productPosts} technicalPosts={technicalPosts} />
    </Layout>
  );
};

export const query = graphql`
  query StartHereQuery {
    popularPosts: contentfulStartHerePage(
      title: { eq: "Start Here Page Popular Posts" }
    ) {
      title
      popularProductPosts {
        ...PopularPostContent
      }
      popularTechnicalPosts {
        ...PopularPostContent
      }
    }
  }
`;

export default StartPage;
