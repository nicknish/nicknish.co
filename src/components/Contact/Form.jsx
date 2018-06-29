import React from 'react';
import axios from 'axios';
import { navigateTo } from 'gatsby-link';
import NetlifyHoneypot from './NetlifyHoneypot';

const encode = data =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const FORM_SUCCESS_REDIRECT_URL = '/thanks';
const FORM_NAME = 'contact';

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      message: '',
      submitting: false,
      submitSuccess: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.submitting) return;

    this.setState({ submitting: true });

    const form = e.target;
    const formName = form.getAttribute('name');
    const formSuccessRedirectUrl = form.getAttribute('action');

    axios({
      url: '/', // Netlify form submission endpoint
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: encode({
        'form-name': formName,
        ...this.state
      })
    })
      .then(() => {
        navigateTo(formSuccessRedirectUrl);
        this.setState({ submitting: false, submitSuccess: true });
      })
      .catch(error => console.error(error));
  };

  handleChange = e => {
    if (this.state.submitting) return;
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, message, submitting, submitSuccess } = this.state;
    const { pathName } = this.props;

    if (submitSuccess || pathName === FORM_SUCCESS_REDIRECT_URL) return null;

    return (
      <form
        className="contactForm container"
        action={FORM_SUCCESS_REDIRECT_URL}
        name={FORM_NAME}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        <NetlifyHoneypot formName={FORM_NAME} />
        <h3 className="contactForm-title">Contact Me</h3>
        <div className="field">
          <label className="label" htmlFor="contact-name">
            Name:
          </label>
          <div className="control">
            <input
              className="input"
              name="name"
              id="contact-name"
              type="text"
              value={name}
              placeholder="Jackie Chan"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="contact-email">
            Email:
          </label>
          <div className="control">
            <input
              className="input"
              name="email"
              id="contact-email"
              type="email"
              value={email}
              placeholder="jackie@chan.com"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="contact-message">
            Message:
          </label>
          <div className="control">
            <textarea
              name="message"
              className="textarea"
              id="contact-message"
              value={message}
              placeholder="Hi there!"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className="u-textCenter">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={submitting}
          >
            Send Message
          </button>
        </div>
      </form>
    );
  }
}
