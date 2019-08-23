import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '../button';
import axios from 'axios';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const SIGNUP_LAMBDA_URL = '/.netlify/functions/newsletterSignup';

const validate = values => {
  let errors = {};

  if (!values.email || !EMAIL_REGEX.test(values.email)) {
    errors.email = 'Oops! Please enter a valid email';
  }

  return errors;
};

const handleSubmit = onComplete => async (
  values,
  { setSubmitting, resetForm, setFieldError }
) => {
  try {
    const response = await axios.post(SIGNUP_LAMBDA_URL, values, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status < 300) {
      onComplete(true);
      resetForm();
    } else {
      setFieldError('email', response.data.error);
    }
  } catch (error) {
    console.error('Submission error', error);
    setFieldError('email', 'Oops, there was an error!');
  }

  setSubmitting(false);
};

const NewsletterSignupForm = ({ onComplete }) => (
  <Formik
    validate={validate}
    initialValues={{ email: '' }}
    onSubmit={handleSubmit(onComplete)}
  >
    {({ handleSubmit, submitCount, isValid, isSubmitting }) => {
      const hasSubmittedWithErrors = submitCount > 0 && !isValid;

      return (
        <Form>
          <p className="f5 mt0">
            Learn how to code and get the scoop on tech salaries, JavaScript,
            React, and more.
          </p>
          <Field
            type="email"
            name="email"
            className="w-100 w-50-ns ba b--black-20 pa2 mb2 br2"
            placeholder="johnapple@gmail.com"
            disabled={isSubmitting}
          />
          {hasSubmittedWithErrors ? (
            <ErrorMessage name="email" component="p" className="f6 mv1" />
          ) : null}
          <div>
            <Button
              theme="primary"
              className="mt2"
              size="small"
              onClick={handleSubmit}
              type="button"
              disabled={hasSubmittedWithErrors || isSubmitting}
            >
              Subscribe
            </Button>
          </div>
        </Form>
      );
    }}
  </Formik>
);

const NewsletterSignup = () => {
  const [showSuccess, updateShowSuccess] = useState(false);

  return (
    <div className="container mt5">
      <p className="f4 b mt0 mb2 primary">Sign up for the newsletter</p>
      {showSuccess ? (
        <div className="f5 mt3">Thanks for signing up!</div>
      ) : (
        <NewsletterSignupForm onComplete={updateShowSuccess} />
      )}
    </div>
  );
};

export default NewsletterSignup;
