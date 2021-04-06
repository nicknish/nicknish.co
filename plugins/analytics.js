const PROD_PLUGINS =
  process.env.NODE_ENV === 'production'
    ? [
        {
          resolve: `gatsby-plugin-google-analytics`,
          options: {
            trackingId: process.env.GOOGLE_ANALYTICS,
            head: true,
            anonymize: false,
            respectDNT: true,
            exclude: [],
          },
        },
      ]
    : [];

module.exports = {
  plugins: [...PROD_PLUGINS],
};
