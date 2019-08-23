import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Button from './button';

const IndexCard = ({
  path,
  title,
  date,
  imageSizes,
  imagePreviewDescription,
  descriptionExcerpt
}) => {
  let subtitle;
  let imageSection;

  if (date) {
    subtitle = <span className="indexCard-headerSubtitle">{date}</span>;
  }

  if (imageSizes) {
    imageSection = (
      <Link to={path}>
        <Img sizes={imageSizes} alt={imagePreviewDescription} />
      </Link>
    );
  }

  return (
    <section className="indexCard container">
      {imageSection}

      <div className="indexCard-header">
        <h2 className="indexCard-headerTitle">
          <Link to={path} className="indexCard-headerTitleLink">
            {title}
          </Link>
        </h2>
        {subtitle}
      </div>

      <div
        className="indexCard-description"
        dangerouslySetInnerHTML={{ __html: descriptionExcerpt }}
      />

      <Button to={path} theme="primary" size="small" component={Link}>
        Read More
      </Button>
    </section>
  );
};

IndexCard.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  imageSizes: PropTypes.object,
  imagePreviewDescription: PropTypes.string,
  descriptionExcerpt: PropTypes.string
};

IndexCard.defaultProps = {
  date: null,
  imageSizes: null,
  imagePreviewDescription: null,
  descriptionExcerpt: null
};

export default IndexCard;
