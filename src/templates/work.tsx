import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import Show, { SHOW_TYPES } from '../components/Show';
import { getDate } from '../utils/helpers';

const WorkTemplate = ({
  path,
  data: {
    post: { title, startDate, endDate, current, description, images = [], url },
  },
}) => {
  return (
    <Show
      title={title}
      description={description.childMarkdownRemark.html}
      date={getDate(startDate, endDate, current)}
      path={path}
      external_url={url}
      type={SHOW_TYPES.WORK}
      image={get(images, '[0].gatsbyImageData')}
      image_preview_description={get(images, '[0].description')}
    />
  );
};

export const query = graphql`
  query($slug: String!) {
    post: contentfulWork(slug: { eq: $slug }) {
      ...WorkInfo
    }
  }
`;

export default WorkTemplate;
