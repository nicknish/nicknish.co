import React from 'react';
import PropTypes from 'prop-types';

export const NetlifyHoneypot = ({ formName }) => (
  <div>
    <input type="hidden" name="form-name" value={formName} />
    <span className="u-hidden" style={{ visibility: 'hidden' }}>
      <label htmlFor="bot-field">
        Do not fill this out if you are human <input name="bot-field" />
      </label>
    </span>
  </div>
);

NetlifyHoneypot.propTypes = {
  formName: PropTypes.string.isRequired
};

export default NetlifyHoneypot;
