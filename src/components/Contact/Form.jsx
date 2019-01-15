import React from 'react';
import NetlifyForm from './netlifyForm';

export default class ContactForm extends React.Component {
  state = {
    name: '',
    email: '',
    message: '',
    submitting: false
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.submitting) return;
    this.setState({ submitting: true });

    this.props.handleSubmit(this.state).then(() => {
      this.setState({ submitting: false });
    });
  };

  handleChange = e => {
    if (this.state.submitting) return;
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, message, submitting } = this.state;
    const { formName } = this.props;

    return (
      <NetlifyForm
        className="contactForm container"
        name={formName}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      >
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
              placeholder="Name"
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
              placeholder="Email"
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
      </NetlifyForm>
    );
  }
}
