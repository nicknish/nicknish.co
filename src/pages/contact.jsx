import React from 'react';
import axios from 'axios';
import { navigateTo } from 'gatsby-link';

import Layout from '../components/layout';
import Form from '../components/contact/form';
import Page from '../components/layout/page';

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
    const { location } = this.props;

    return (
      <Layout location={location}>
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
