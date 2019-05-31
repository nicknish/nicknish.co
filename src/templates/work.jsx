import React from 'react';
import get from 'lodash/get';

import Show, { SHOW_TYPES } from '../components/layout/show';
import { getDate } from '../utils/helpers';

export default ({
  data: {
    post: {
      title,
      slug,
      startDate,
      endDate,
      current,
      description,
      images = [],
      url
    }
  }
}) => (
  <Show
    title={title}
    description={description.childMarkdownRemark.html}
    date={getDate(startDate, endDate, current)}
    path={`work/${slug}`}
    external_url={url}
    type={SHOW_TYPES.WORK}
    image={get(images, '[0].sizes')}
    image_preview_description={get(images, '[0].description')}
  />
);

export const query = graphql`
  query($slug: String!) {
    post: contentfulWork(slug: { eq: $slug }) {
      ...WorkInfo
    }
  }

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
