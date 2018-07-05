import React from 'react';
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

export const Footer = ({ socialMediaUrls }) => (
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
  </footer>
);

export default Footer;
