import React from 'react';
import get from 'lodash/get';

import Show, { SHOW_TYPES } from '../components/layout/show';
import { getDate } from '../utils/helpers';

export default ({
  data: {
    post: { title, startDate, endDate, current, description, images = [], url }
  },
  location
}) => (
  <Show
    location={location}
    title={title}
    description={description.childMarkdownRemark.html}
    date={getDate(startDate, endDate, current)}
    external_url={url}
    type={SHOW_TYPES.PROJECT}
    image={get(images, '[0].sizes')}
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
        sizes(maxWidth: 640) {
          ...ImageSizes
        }
      }
    }
  }
`;
