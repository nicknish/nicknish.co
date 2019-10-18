import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button, { ButtonThemes, ButtonSizes } from '../button';
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

const NewsletterSignupForm = () => {
  const [showSuccess, updateShowSuccess] = useState(false);

  if (showSuccess) {
    return (
      <div className="f5 mt3" data-testid="NewsletterSignupForm--success">
        Thanks for signing up!
      </div>
    );
  }

  return (
    <Formik
      validate={validate}
      initialValues={{ email: '' }}
      onSubmit={handleSubmit(updateShowSuccess)}
    >
      {({ handleSubmit, submitCount, isValid, isSubmitting }) => {
        const hasSubmittedWithErrors = submitCount > 0 && !isValid;

        return (
          <Form data-testid="NewsletterSignupForm">
            <Field
              type="email"
              name="email"
              className="w-100 w-50-ns ba b--black-20 pa2 mb2 br2"
              placeholder="johnapple@gmail.com"
              disabled={isSubmitting}
            />
            {hasSubmittedWithErrors ? (
              <ErrorMessage
                name="email"
                component="p"
                className="f6 mv1"
                data-testid="NewsletterSignupForm--error"
              />
            ) : null}
            <div>
              <Button
                theme={ButtonThemes.primary}
                className="mt2 ttu"
                size={ButtonSizes.small}
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
};

export default NewsletterSignupForm;
