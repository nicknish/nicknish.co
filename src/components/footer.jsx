import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { FaGithubAlt, FaLinkedin, FaTwitter } from 'react-icons/lib/fa';

const iconChooser = key => {
  switch (key) {
    case 'github':
      return <FaGithubAlt />;
    case 'twitter':
      return <FaTwitter />;
    case 'linkedin':
      return <FaLinkedin />;
    default:
      return null;
  }
};

const query = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        title
        site_description
        site_keywords
        github_url
        linkedin_url
        twitter_url
      }
    }
  }
`;

export const Footer = () => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: { github_url, linkedin_url, twitter_url }
      }
    }) => {
      const socialMediaUrls = {
        github: github_url,
        linkedin: linkedin_url,
        twitter: twitter_url
      };

      return (
        <footer className="footer">
          <nav className="footer-social">
            <ul className="footer-socialList">
              {Object.keys(socialMediaUrls).map(key => (
                <li className="footer-socialListItem" key={key}>
                  <a
                    href={socialMediaUrls[key]}
                    className="footer-socialListItemLink"
                  >
                    {iconChooser(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mb3 tc">
            <span className="f6 black-30">
              &copy; Nick Nish {new Date().getFullYear()}
            </span>
          </div>
        </footer>
      );
    }}
  />
);

export default Footer;
