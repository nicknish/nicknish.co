import { graphql } from 'gatsby';

export const query = graphql`
  fragment Markdown on MarkdownRemark {
    html
  }
`;
