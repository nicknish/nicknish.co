/**
 * Based on examples:
 * - https://github.com/netlify/create-react-app-lambda
 * - https://github.com/tobilg/netlify-functions-landingpage
 * - https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/
 */

import axios from 'axios';

/**
 * EDIT THESE ENV VARIABLES IN NETLIFY
 */
const mailChimpAPI = process.env.MAILCHIMP_API_KEY;
const mailChimpListID = process.env.MAILCHIMP_LIST_ID;
const mcRegion = process.env.MAILCHIMP_REGION;

const buildResponse = (statusCode, { body = {}, headers = {} }) => ({
  statusCode,
  headers,
  body: JSON.stringify(body)
});

export const handler = async (event, context) => {
  if (process.env.NODE_ENV === 'development') {
    return buildResponse(201, {
      body: { status: 'saved email' },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }

  try {
    let errorMessage;
    const formData = JSON.parse(event.body);
    const email = formData.email;

    if (!formData) {
      errorMessage = 'No form data supplied';
      console.log('Error', errorMessage);
      return buildResponse(400, { body: { error: errorMessage } });
    }

    if (!email) {
      errorMessage = 'No EMAIL supplied';
      console.log('Error', errorMessage);
      return buildResponse(400, { body: { error: errorMessage } });
    }

    if (!mailChimpListID) {
      errorMessage = 'No LIST_ID supplied';
      console.log('Error', errorMessage);
      return buildResponse(400, { body: { error: errorMessage } });
    }

    // Follows the Mailchimp schema
    const subscriber = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {}
    };

    console.log('Sending data to mailchimp', subscriber);
    const request = await axios.post(
      `https://${mcRegion}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members`,
      subscriber,
      {
        headers: {
          Authorization: `apikey ${mailChimpAPI}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const { error, status, data } = request;

    if (error) {
      return buildResponse(400, { body: { error } });
    }

    console.log('Mailchimp body: ' + data);
    console.log('Status Code: ' + status);

    if (status < 300 || data.title === 'Member Exists') {
      console.log('Added to list in Mailchimp subscriber list');

      return buildResponse(201, {
        body: { status: 'saved email' },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      });
    } else {
      console.log('Error from mailchimp', data.detail);
      return buildResponse(500, { body: data.detail });
    }
  } catch (error) {
    console.log('Error', error);
    return buildResponse(500, { body: { error: 'Error' } });
  }
};
