# nicknish.co

This portfolio version is built with GatsbyJS, a static site generator. In this project, we use the JAMStack architecture using React, GraphQL, and Markdown files.

To get reacquainted, check out the `package.json` first or use one of these commands:

```bash
yarn start # start server for dev with Hot Module Reloading and netlify functions
yarn build # create production build with app and netlify functions
yarn serve # start server for testing build site
```

## Environment Variables Needed

In order to run this app, you'll need these environment variables for everything to function.

Run `touch .env.development` and add these variables. Contact me for the correct values.

- CONTENTFUL_SPACE_ID
- CONTENTFUL_ACCESS_TOKEN
- CONTENTFUL_PRODUCTION_ENDPOINT
- CONTENTFUL_PREVIEW_ACCESS_TOKEN
- CONTENTFUL_PREVIEW_ENDPOINT
- CONTENTFUL_ENV
- MAILCHIMP_API_KEY
- MAILCHIMP_LIST_ID
- MAILCHIMP_REGION
- GATSBY_SITE_RECAPTCHA_KEY
- GOOGLE_ANALYTICS
