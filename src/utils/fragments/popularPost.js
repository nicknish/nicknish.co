import { graphql } from 'gatsby';

export const query = graphql`
  fragment PopularPostContent on ContentfulPost {
    description {
      childMarkdownRemark {
        excerpt(pruneLength: 160)
      }
    }
    body {
      childMarkdownRemark {
        excerpt(pruneLength: 160)
      }
    }
    date(formatString: "MMM D, YYYY")
    title
    slug
  }
`;
