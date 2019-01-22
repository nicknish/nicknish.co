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

    <div className="mb3 tc">
      <span className="f6 black-30">
        &copy; Nick Nish {new Date().getFullYear()}
      </span>
    </div>
  </footer>
);

export default Footer;
