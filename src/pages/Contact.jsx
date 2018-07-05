import React from 'react';
import axios from 'axios';
import { navigateTo } from 'gatsby-link';

import Form from '../components/Contact/Form';

const FORM_SUCCESS_REDIRECT_URL = '/thanks';
const FORM_NAME = 'contact';

const encode = data =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

export default class Contact extends React.Component {
  handleSubmit = values => {
    return axios({
      url: '/', // Netlify form submission endpoint
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: encode({
        'form-name': FORM_NAME,
        ...values
      })
    })
      .then(() => {
        navigateTo(FORM_SUCCESS_REDIRECT_URL);
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div className="page">
        <section className="container">
          <h1 className="index-title">Contact Me</h1>
          <p>Say hello! I'm always happy to talk and meet new people.</p>
        </section>

        <Form formName={FORM_NAME} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}
