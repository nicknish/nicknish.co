import React from 'react';
import Path from 'path';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import Layout from '../components/layout';
import Page from '../components/layout/page';

export const Show = ({ data, location }) => {
  const {
    markdownRemark: {
      html,
      frontmatter: {
        title,
        date,
        external_url,
        path,
        image_preview_url,
        image_preview_description
      }
    }
  } = data;
  const { backUrl, backLinkText, headerText } = prepareShowData(path);

  let externalLink;
  let imageSection;

  if (external_url) {
    externalLink = (
      <a href={external_url} className="show-externalLink ml2" target="_blank">
        See it here <FaExternalLink className="show-externalLinkIcon" />
      </a>
    );
  }

  if (image_preview_url) {
    imageSection = (
      <div className="container">
        <figure className="show-imageContainer">
          <Img
            sizes={image_preview_url.childImageSharp.sizes}
            alt={image_preview_description}
            className="show-image"
          />
        </figure>
      </div>
    );
  }

  return (
    <Layout location={location}>
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
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Page>
    </Layout>
  );
};

const prepareShowData = path => {
  const type = Path.dirname(path).indexOf('work') > -1 ? 'work' : 'project';
  const isProject = type === 'project';

  const backUrl = `/${type === 'work' ? 'work' : 'projects'}`;
  const backLinkText = `${isProject ? 'projects' : 'work'}`;
  const headerText = `${isProject ? 'Project' : 'Role'} Description`;

  return { backUrl, backLinkText, headerText };
};

export default Show;

export const query = graphql`
  query ShowQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        path
        external_url
        image_preview_url {
          childImageSharp {
            sizes(maxWidth: 630) {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalImg
              originalName
            }
          }
        }
        image_preview_description
        date
        excerpt
      }
    }
  }
`;
