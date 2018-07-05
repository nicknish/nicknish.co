import React from 'react';
import Link from 'gatsby-link';

export const ContactFormSuccess = () => (
  <div className="container">
    <h1 className="index-title">Thank you!</h1>
    <p>I will try to respond to your message within 24 hours.</p>
    <div className="u-textCenter">
      <Link to="/" className="btn btn-sm btn-primary">
        Go Home
      </Link>
    </div>
  </div>
);

export default ContactFormSuccess;
