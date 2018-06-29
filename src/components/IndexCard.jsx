import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

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
        <h3 className="indexCard-headerTitle">
          <Link to={path} className="indexCard-headerTitleLink">
            {title}
          </Link>
        </h3>
        {subtitle}
      </div>

      <p className="indexCard-description">{descriptionExcerpt}</p>

      <Link to={path} className="btn btn-primary btn-sm">
        Read More
      </Link>
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
