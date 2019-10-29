import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const SiteMetadata: React.FC = () => {
  return (
    <StaticQuery
      query={graphql`
        query SiteMetadata {
          site {
            siteMetadata {
              themeColor
            }
          }
        }
      `}
      render={({
        site: {
          siteMetadata: { themeColor }
        }
      }) => (
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />

          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content={themeColor} />
          <meta name="theme-color" content={themeColor} />
          <meta
            name="google-site-verification"
            content="ZsR7DBayXkYHUqgVqkePKJRLeQXzkri7m-s5CFZzMG4"
          />
        </Helmet>
      )}
    />
  );
};

export default SiteMetadata;
