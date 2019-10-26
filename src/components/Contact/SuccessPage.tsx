import React from 'react';
import { Link } from 'gatsby';
import Page from '../Layout/Page';
import Button, { ButtonThemes, ButtonSizes } from '../common/Button';

const SuccessPage: React.FC = () => {
  return (
    <Page className="container tc">
      <h1 className="page-title">Thank you!</h1>
      <p className="mb4">
        I will try to respond to your message within 24 hours.
      </p>
      <Button
        theme={ButtonThemes.primary}
        size={ButtonSizes.small}
        component={Link}
        to="/"
      >
        Go Home
      </Button>
    </Page>
  );
};

export default SuccessPage;
