import React from 'react';
import { graphql } from 'gatsby';

import { SEOTypes } from '../components/Layout/SEO';
import Layout from '../components/Layout/Layout';
import { WORK_URL } from '../constants/urls';
import Work from '../components/Work';

const WorkPage = ({ data }) => {
  return (
    <Layout type={SEOTypes.page} content={{ title: 'Career' }} path={WORK_URL}>
      <Work data={data} />
    </Layout>
  );
};

export default WorkPage;

export const query = graphql`
  query WorkQuery {
    site {
      siteMetadata {
        resume_url
      }
    }

    work: allContentfulWork(
      filter: { freelanceWork: { eq: false } }
      sort: { fields: [startDate], order: DESC }
    ) {
      edges {
        node {
          ...WorkInfo
        }
      }
    }

    contract_work: allContentfulWork(
      filter: { freelanceWork: { eq: true } }
      sort: { fields: [startDate], order: DESC }
    ) {
      edges {
        node {
          ...WorkInfo
        }
      }
    }

    projects: allContentfulProject(sort: { fields: [startDate], order: DESC }) {
      edges {
        node {
          title
          slug
          startDate(formatString: "MMM YYYY")
          endDate(formatString: "MMM YYYY")
          current
          excerpt {
            childMarkdownRemark {
              ...Markdown
              excerpt
            }
          }
        }
      }
    }
  }
`;
