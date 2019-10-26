import React from 'react';
import axios from 'axios';
import { navigate } from 'gatsby-link';

import { SEOTypes } from '../components/SEO';
import Layout from '../components/Layout/Layout';
import Form from '../components/contact/form';
import Page from '../components/Layout/Page';

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
      params: {
        'no-cache': 1 // Recommended for Netlify to work with Gatsby v2
      },
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: encode({
        'form-name': FORM_NAME,
        ...values
      })
    })
      .then(() => {
        navigate(FORM_SUCCESS_REDIRECT_URL);
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <Layout
        type={SEOTypes.page}
        content={{ title: 'Contact' }}
        path="/contact"
      >
        <Page>
          <header className="container">
            <h1 className="page-title">Contact Me</h1>
            <p className="page-subtitle">
              Say hello! I'm always happy to talk and meet new people.
            </p>
          </header>

          <Form formName={FORM_NAME} handleSubmit={this.handleSubmit} />
        </Page>
      </Layout>
    );
  }
}
