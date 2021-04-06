import React from 'react';
import get from 'lodash/get';
import { graphql } from 'gatsby';

import Show, { SHOW_TYPES } from '../components/Show';
import { getDate } from '../utils/helpers';

const ProjectTemplate = ({
  path,
  data: {
    post: { title, startDate, endDate, current, description, images = [], url },
  },
}) => (
  <Show
    path={path}
    title={title}
    description={description.childMarkdownRemark.html}
    date={getDate(startDate, endDate, current)}
    external_url={url}
    type={SHOW_TYPES.PROJECT}
    image={get(images, '[0].gatsbyImageData')}
    image_preview_description={get(images, '[0].description')}
  />
);

export const query = graphql`
  query($slug: String!) {
    post: contentfulProject(slug: { eq: $slug }) {
      title
      url
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
        }
      }
      images {
        description
        gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
      }
    }
  }
`;

export default ProjectTemplate;
