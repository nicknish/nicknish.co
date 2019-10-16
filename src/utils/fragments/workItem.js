import { graphql } from 'gatsby';

export const query = graphql`
  fragment WorkInfo on ContentfulWork {
    title
    slug
    startDate(formatString: "MMM YYYY")
    endDate(formatString: "MMM YYYY")
    current
    description {
      childMarkdownRemark {
        ...Markdown
      }
    }
    excerpt {
      childMarkdownRemark {
        ...Markdown
        excerpt(format: PLAIN)
      }
    }
    url
    images {
      description
      sizes(maxWidth: 640) {
        ...ImageSizes
      }
    }
  }
`;
