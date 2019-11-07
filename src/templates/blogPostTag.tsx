import React from 'react';
import { graphql } from 'gatsby';

export interface BlogPostTagsResponse {
  pageContext: {
    tag: string;
  };
  data: {
    allContentfulPost: {
      totalCount: number;
      edges: Array<{
        node: {
          slug: string;
          title: string;
          date: string;
          description?: {
            childMarkdownRemark: {
              excerpt: string;
            };
          };
          body: {
            childMarkdownRemark: {
              excerpt: string;
            };
          };
        };
      }>;
    };
  };
}

interface IBlogPostTagTemplateProps {
  data: any;
}

const BlogPostTagTemplate: React.FC<IBlogPostTagTemplateProps> = ({
  pageContext,
  data
}) => {
  return <BlogPostTagTemplate {...data} />;
};

export default BlogPostTagTemplate;

export const pageQuery = graphql`
  query BlogTagPosts($tag: String) {
    allContentfulPost(
      limit: 2000
      sort: { fields: [date], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
      edges {
        node {
          slug
          title
          date(formatString: "MMM D YYYY")
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
        }
      }
    }
  }
`;
