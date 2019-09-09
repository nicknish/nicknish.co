module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: true,
        anonymize: false,
        respectDNT: true,
        exclude: []
      }
    }
  ]
};
