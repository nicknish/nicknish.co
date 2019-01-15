import React from 'react';
import PropTypes from 'prop-types';

export const NetlifyForm = ({
  className,
  name,
  onSubmit,
  onChange,
  children
}) => (
  <form
    className={className}
    name={name}
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    onSubmit={onSubmit}
  >
    <div hidden>
      <input type="hidden" name="form-name" value={name} />
      <label htmlFor="bot-field">
        Do not fill this out if you are human{' '}
        <input name="bot-field" onChange={onChange} />
      </label>
    </div>
    {children}
  </form>
);

NetlifyForm.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default NetlifyForm;
