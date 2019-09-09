import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import Layout from '../layout';
import Page from './page';

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
        className="show-externalLink ml2"
        target="_blank"
        rel="noopener noreferrer"
      >
        See it here <FaExternalLink className="show-externalLinkIcon" />
      </OutboundLink>
    );
  }

  if (image) {
    imageSection = (
      <div className="container">
        <figure className="show-imageContainer">
          <Img
            sizes={image}
            alt={image_preview_description}
            className="show-image"
          />
        </figure>
      </div>
    );
  }

  return (
    <Layout page={{ title }} path={path}>
      <Page>
        <header className="show-header container">
          <span className="show-backLink dib">
            <Link to={backUrl} className="flex items-center">
              <FaChevronLeft className="mt1 mr1" />
              <span className="show-backLinkText">{backLinkText}</span>
            </Link>
          </span>
          <h1 className="show-title">{title}</h1>
          <span className="show-subtitle">
            {date}
            {externalLink}
          </span>
        </header>

        {imageSection}

        <div className="container">
          <h3>{headerText}</h3>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </Page>
    </Layout>
  );
};

const prepareShowData = type => {
  const isProject = type === SHOW_TYPES.PROJECT;

  const backUrl = `/${type === SHOW_TYPES.WORK ? 'work' : 'projects'}`;
  const backLinkText = `${isProject ? 'projects' : 'work'}`;
  const headerText = `${isProject ? 'Project' : 'Role'} Description`;

  return { backUrl, backLinkText, headerText };
};

export default Show;
