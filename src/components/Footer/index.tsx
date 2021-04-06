import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { FaGithubAlt, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { NEWSLETTER_URL } from '../../constants/urls';

import * as styles from './Footer.module.css';

const ICONS = {
  github: <FaGithubAlt />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedin />,
};

const query = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        github_url
        linkedin_url
        twitter_url
        resume_url
      }
    }
  }
`;

export const Footer = () => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: { github_url, linkedin_url, twitter_url, resume_url },
      },
    }) => {
      const socialMediaUrls = {
        github: github_url,
        linkedin: linkedin_url,
        twitter: twitter_url,
      };

      return (
        <footer className={styles.footer}>
          <nav className={styles.footerSocial}>
            <ul className={styles.footerSocialList}>
              {Object.keys(socialMediaUrls).map(key => (
                <li className={styles.footerSocialListItem} key={key}>
                  <OutboundLink
                    href={socialMediaUrls[key]}
                    className={styles.footerSocialListItemLink}
                  >
                    {ICONS[key]}
                  </OutboundLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.footerLinks}>
            <Link className={styles.footerLink} to={NEWSLETTER_URL}>
              Newsletter
            </Link>
            <OutboundLink className={styles.footerLink} href={resume_url}>
              Resume
            </OutboundLink>
          </nav>

          <div className={styles.copyright}>
            <span className={styles.copyrightText}>
              &copy; Nick Nish {new Date().getFullYear()}
            </span>
          </div>
        </footer>
      );
    }}
  />
);

export default Footer;
