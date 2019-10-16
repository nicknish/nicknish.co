import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import { SEOTypes } from '../SEO';
import Layout from '../layout';
import Page from '../layout/page';
import { WORK_URL } from '../../constants/urls';

import styles from './Show.module.css';

export const SHOW_TYPES = {
  PROJECT: 'project',
  WORK: 'work'
};

export const Show = ({
  path,
  title,
  description,
  date,
  external_url,
  type,
  image,
  image_preview_description
}) => {
  const { backUrl, backLinkText, headerText } = prepareShowData(type);

  let externalLink;
  let imageSection;

  if (external_url) {
    externalLink = (
      <OutboundLink
        href={external_url}
        className={styles.showExternalLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        See it here <FaExternalLink className={styles.showExternalLinkIcon} />
      </OutboundLink>
    );
  }

  if (image) {
    imageSection = (
      <div className="container">
        <figure className={styles.showImageContainer}>
          <Img
            sizes={image}
            alt={image_preview_description}
            className={styles.showImage}
          />
        </figure>
      </div>
    );
  }

  return (
    <Layout type={SEOTypes.page} content={{ title }} path={path}>
      <Page>
        <header className={styles.showHeader}>
          <span className={styles.showBackLink}>
            <Link to={backUrl} className={styles.showBackLinkLink}>
              <FaChevronLeft className="mt1 mr1" />
              <span className={styles.showBackLinkText}>{backLinkText}</span>
            </Link>
          </span>
          <h1 className={styles.showTitle}>{title}</h1>
          <span className={styles.showSubtitle}>
            {date}
            {externalLink}
          </span>
        </header>

        {imageSection}

        <div className="container">
          <h3 className={styles.showSectionTitle}>{headerText}</h3>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </Page>
    </Layout>
  );
};

const prepareShowData = type => {
  const isProject = type === SHOW_TYPES.PROJECT;

  const backUrl = WORK_URL;
  const backLinkText = `Back to work`;
  const headerText = `${isProject ? 'Project' : 'Role'} Description`;

  return { backUrl, backLinkText, headerText };
};

export default Show;
